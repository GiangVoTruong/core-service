import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Address } from './address.entity'
import { Order } from './order.entity'
import { CartItem } from './cart-item.entity'
import { Wishlist } from './wishlist.entity'
import { Review } from './review.entity'
import { Notification } from './notification.entity'
import { Post } from './post.entity'
import { Product } from './product.entity'

enum UserRole {
  CUSTOMER = 'customer',
  SELLER = 'seller',
  ADMIN = 'admin',
}

@Entity('users')
export class Users {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column({ name: 'full_name' })
  fullName: string

  @Column({ nullable: true })
  phone: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Address, address => address.user)
  addresses: Address[]

  @OneToMany(() => Order, order => order.user)
  orders: Order[]

  @OneToMany(() => CartItem, cartItem => cartItem.user)
  cartItems: CartItem[]

  @OneToMany(() => Wishlist, wishlist => wishlist.user)
  wishlists: Wishlist[]

  @OneToMany(() => Review, review => review.user)
  reviews: Review[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[]

  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  @OneToMany(() => Product, product => product.seller)
  products: Product[]
}
