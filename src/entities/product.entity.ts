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
import { Category } from './category.entity'
import { Brand } from './brand.entity'
import { ProductImage } from './product-image.entity'
import { ProductAttribute } from './product-attribute.entity'
import { ProductVariant } from './product-variant.entity'
import { CartItem } from './cart-item.entity'
import { Wishlist } from './wishlist.entity'
import { Review } from './review.entity'
import { OrderItem } from './order-item.entity'
import { PromotionProduct } from './promotion-product.entity'

@Entity('products')
export class Product {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'seller_id' })
  sellerId: string

  @ManyToOne(() => Users, user => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: Users

  @Column({ name: 'category_id' })
  categoryId: string

  @ManyToOne(() => Category, category => category.products, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'brand_id', nullable: true })
  brandId: string

  @ManyToOne(() => Brand, brand => brand.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number

  @Column({ name: 'sale_price', type: 'decimal', precision: 15, scale: 2, nullable: true })
  salePrice: number

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => ProductImage, productImage => productImage.product)
  images: ProductImage[]

  @OneToMany(() => ProductAttribute, productAttribute => productAttribute.product)
  attributes: ProductAttribute[]

  @OneToMany(() => ProductVariant, productVariant => productVariant.product)
  variants: ProductVariant[]

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[]

  @OneToMany(() => Wishlist, wishlist => wishlist.product)
  wishlists: Wishlist[]

  @OneToMany(() => Review, review => review.product)
  reviews: Review[]

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[]

  @OneToMany(() => PromotionProduct, promotionProduct => promotionProduct.product)
  promotions: PromotionProduct[]
}
