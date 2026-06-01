import { relations } from 'drizzle-orm';
import { index, pgTable, text, timestamp, uuid, varchar, vector } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('usersTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 250 }).notNull(),
  email: varchar('email', { length: 400 }).notNull().unique(),
  password: varchar('password', { length: 60 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const ContentTable = pgTable(
  'contentTable',
  {
    id: uuid('id').primaryKey().defaultRandom().unique(),
    title: text('title').notNull().unique(),
    description: text('description'),
    link: text('link'),
    // varchar instead of pgEnum — category list is validated at the application layer (Zod)
    category: varchar('category', { length: 100 }).default('Others').notNull(),
    tags: varchar('tags', { length: 50 }).array(),
    userId: uuid('userId')
      .references(() => UsersTable.id, { onDelete: 'cascade' })
      .notNull(),
    createdDate: timestamp('createdDate').defaultNow().notNull(),
    updatedDate: timestamp('updatedDate').defaultNow().notNull(),
    embedding: vector('embedding', { dimensions: 768 }),
  },
  (ContentTable) => ({
    userIndex: index('userIndex').on(ContentTable.userId),
    embeddingIndex: index('embeddingIndex').using('hnsw', ContentTable.embedding.op('vector_cosine_ops')),
  }),
);


export const tagsTable = pgTable('tagsTable', {
  // for vector search
  id: uuid('id').primaryKey().defaultRandom(),
  tags: varchar('tags', { length: 60 }).notNull().unique(),
});

export const UserShareLinkTable = pgTable('UserShareLinkTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  linkHash: text('linkhash').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' }),
});

// contentLink
export const ContentShareLinkTable = pgTable('ContentShareLinkTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentSharehash: text('contentShareHash').notNull(),
  contentId: uuid('contentId')
    .references(() => ContentTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(), // one content will have one share link
});

//  RELATIONS
export const UsersRelation = relations(UsersTable, ({ one, many }) => {
  return {
    userContent: many(ContentTable),
    userLink: one(UserShareLinkTable),
  };
});

export const ContentRelation = relations(ContentTable, ({ one }) => {
  return {
    user: one(UsersTable, {
      fields: [ContentTable.userId],
      references: [UsersTable.id],
    }),
    contentLink: one(ContentShareLinkTable),
  };
});

export const UserLinkRelation = relations(UserShareLinkTable, ({ one }) => {
  return {
    user: one(UsersTable, {
      fields: [UserShareLinkTable.userId],
      references: [UsersTable.id],
    }),
  };
});

export const ContentLinkRelation = relations(ContentShareLinkTable, ({ one }) => {
  return {
    content: one(ContentTable, {
      fields: [ContentShareLinkTable.contentId],
      references: [ContentTable.id],
    }),
  };
});
