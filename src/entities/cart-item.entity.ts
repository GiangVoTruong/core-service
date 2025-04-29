import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Users } from './user.entity'
import { Product } from './product.entity'
import { ProductVariant } from './product-variant.entity'

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => Users, user => user.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'variant_id', nullable: true })
  variantId: string

  @ManyToOne(() => ProductVariant, variant => variant.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant

  @Column({ default: 1 })
  quantity: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
