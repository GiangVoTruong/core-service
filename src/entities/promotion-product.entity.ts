import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { Promotion } from './promotion.entity'
import { Product } from './product.entity'

@Entity('promotion_products')
export class PromotionProduct {
  @PrimaryColumn({ name: 'promotion_id' })
  promotionId: string

  @PrimaryColumn({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Promotion, promotion => promotion.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion

  @ManyToOne(() => Product, product => product.promotions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product
}
