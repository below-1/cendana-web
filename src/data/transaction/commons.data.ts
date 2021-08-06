export enum PaymentMethod {
  OFFLINE = 'OFFLINE',
  CASH = 'CASH',
  ON_DELIVERY = 'ON_DELIVERY',
  CHEQUE_DRAFT = 'CHEQUE_DRAFT',
  WIRED = 'WIRED',
  ONLINE = 'ONLINE'
}

export const PAYMENT_METHOD_OPTIONS = [
  PaymentMethod.OFFLINE,
  PaymentMethod.CASH,
  PaymentMethod.ON_DELIVERY,
  PaymentMethod.CHEQUE_DRAFT,
  PaymentMethod.WIRED,
  PaymentMethod.ONLINE
]

export enum TransactionStatus {
  NEW = 'NEW',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS'
}
