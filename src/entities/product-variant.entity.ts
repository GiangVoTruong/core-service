import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Product } from './product.entity'
import { CartItem } from './cart-item.entity'
import { OrderItem } from './order-item.entity'

@Entity('product_variants')
export class ProductVariant {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'variant_name' })
  variantName: string

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number

  @Column({ name: 'sale_price', type: 'decimal', precision: 15, scale: 2, nullable: true })
  salePrice: number

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity: number

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => CartItem, cartItem => cartItem.variant)
  cartItems: CartItem[]

  @OneToMany(() => OrderItem, orderItem => orderItem.variant)
  orderItems: OrderItem[]
}
