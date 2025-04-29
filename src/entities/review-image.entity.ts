import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Review } from './review.entity'

@Entity('review_images')
export class ReviewImage {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'review_id' })
  reviewId: string

  @ManyToOne(() => Review, review => review.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review: Review

  @Column({ name: 'image_url' })
  imageUrl: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
