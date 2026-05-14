-- Run this in your Supabase dashboard: SQL Editor → New Query

-- Conversation threads (one per chat session)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New conversation',
  race_context JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Individual messages within a conversation
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User-starred resources
CREATE TABLE IF NOT EXISTS resource_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_slug)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS conversations_user_updated_idx ON conversations(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_conv_idx ON chat_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS resource_favorites_user_idx ON resource_favorites(user_id);

-- Auto-bump updated_at on conversations when new messages arrive
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row-level security: each user only sees their own data
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_own" ON conversations FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "chat_messages_own" ON chat_messages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()));

CREATE POLICY "resource_favorites_own" ON resource_favorites FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
