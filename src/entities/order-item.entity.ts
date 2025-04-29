import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'
import { ProductVariant } from './product-variant.entity'
import { Review } from './review.entity'

@Entity('order_items')
export class OrderItem {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'order_id' })
  orderId: string

  @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'variant_id', nullable: true })
  variantId: string

  @ManyToOne(() => ProductVariant, variant => variant.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant

  @Column({ name: 'product_name' })
  productName: string

  @Column({ name: 'variant_name', nullable: true })
  variantName: string

  @Column()
  quantity: number

  @Column({ name: 'unit_price', type: 'decimal', precision: 15, scale: 2 })
  unitPrice: number

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  subtotal: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => Review, review => review.orderItem)
  reviews: Review[]
}
