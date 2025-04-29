import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Users } from './user.entity'
import { Product } from './product.entity'

@Entity('wishlists')
export class Wishlist {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => Users, user => user.wishlists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.wishlists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
