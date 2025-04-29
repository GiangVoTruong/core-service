import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Users } from './user.entity'
import { OrderItem } from './order-item.entity'
import { Payment } from './payment.entity'

enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

enum PaymentMethod {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  E_WALLET = 'e_wallet',
}

@Entity('orders')
export class Order {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => Users, user => user.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column({ name: 'order_number', unique: true })
  orderNumber: string

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus

  @Column({ name: 'total_price', type: 'decimal', precision: 15, scale: 2 })
  totalPrice: number

  @Column({ name: 'shipping_fee', type: 'decimal', precision: 15, scale: 2, default: 0 })
  shippingFee: number

  @Column({ name: 'discount_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  discountAmount: number

  @Column({ name: 'grand_total', type: 'decimal', precision: 15, scale: 2 })
  grandTotal: number

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus

  @Column({ name: 'coupon_code', nullable: true })
  couponCode: string

  @Column({ name: 'recipient_name' })
  recipientName: string

  @Column({ name: 'recipient_phone' })
  recipientPhone: string

  @Column({ name: 'shipping_address', type: 'text' })
  shippingAddress: string

  @Column({ type: 'text', nullable: true })
  notes: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[]

  @OneToMany(() => Payment, payment => payment.order)
  payments: Payment[]
}
