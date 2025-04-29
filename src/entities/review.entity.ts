import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Users } from './user.entity'
import { Product } from './product.entity'
import { OrderItem } from './order-item.entity'
import { ReviewImage } from './review-image.entity'

@Entity('reviews')
export class Review {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => Users, user => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column({ name: 'order_item_id', nullable: true })
  orderItemId: string

  @ManyToOne(() => OrderItem, orderItem => orderItem.reviews, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'order_item_id' })
  orderItem: OrderItem

  @Column()
  rating: number

  @Column({ type: 'text', nullable: true })
  comment: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => ReviewImage, reviewImage => reviewImage.review)
  images: ReviewImage[]
}
