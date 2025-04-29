import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Users } from './user.entity'

enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('posts')
export class Post {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'author_id' })
  authorId: string

  @ManyToOne(() => Users, user => user.posts, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'author_id' })
  author: Users

  @Column()
  title: string

  @Column({ unique: true })
  slug: string

  @Column({ type: 'text' })
  content: string

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PUBLISHED,
  })
  status: PostStatus

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
