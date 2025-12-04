
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model RateLimit
 * 
 */
export type RateLimit = $Result.DefaultSelection<Prisma.$RateLimitPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model WorkingHours
 * 
 */
export type WorkingHours = $Result.DefaultSelection<Prisma.$WorkingHoursPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model ProfessionalService
 * 
 */
export type ProfessionalService = $Result.DefaultSelection<Prisma.$ProfessionalServicePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model CompanyPage
 * 
 */
export type CompanyPage = $Result.DefaultSelection<Prisma.$CompanyPagePayload>
/**
 * Model PageTestimonial
 * 
 */
export type PageTestimonial = $Result.DefaultSelection<Prisma.$PageTestimonialPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Interest: {
  sim: 'sim',
  nao: 'nao',
  talvez: 'talvez'
};

export type Interest = (typeof Interest)[keyof typeof Interest]


export const ContractType: {
  FREE: 'FREE',
  PRO: 'PRO',
  PREMIUM: 'PREMIUM',
  ENTERPRISE: 'ENTERPRISE'
};

export type ContractType = (typeof ContractType)[keyof typeof ContractType]


export const Role: {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const SubscriptionPlan: {
  FREE: 'FREE',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE'
};

export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
  TRIALING: 'TRIALING'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  AUTHORIZED: 'AUTHORIZED',
  IN_PROCESS: 'IN_PROCESS',
  IN_MEDIATION: 'IN_MEDIATION',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
  CHARGED_BACK: 'CHARGED_BACK'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type Interest = $Enums.Interest

export const Interest: typeof $Enums.Interest

export type ContractType = $Enums.ContractType

export const ContractType: typeof $Enums.ContractType

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type SubscriptionPlan = $Enums.SubscriptionPlan

export const SubscriptionPlan: typeof $Enums.SubscriptionPlan

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Leads
 * const leads = await prisma.lead.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Leads
   * const leads = await prisma.lead.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rateLimit`: Exposes CRUD operations for the **RateLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RateLimits
    * const rateLimits = await prisma.rateLimit.findMany()
    * ```
    */
  get rateLimit(): Prisma.RateLimitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workingHours`: Exposes CRUD operations for the **WorkingHours** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkingHours
    * const workingHours = await prisma.workingHours.findMany()
    * ```
    */
  get workingHours(): Prisma.WorkingHoursDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalService`: Exposes CRUD operations for the **ProfessionalService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalServices
    * const professionalServices = await prisma.professionalService.findMany()
    * ```
    */
  get professionalService(): Prisma.ProfessionalServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyPage`: Exposes CRUD operations for the **CompanyPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyPages
    * const companyPages = await prisma.companyPage.findMany()
    * ```
    */
  get companyPage(): Prisma.CompanyPageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pageTestimonial`: Exposes CRUD operations for the **PageTestimonial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PageTestimonials
    * const pageTestimonials = await prisma.pageTestimonial.findMany()
    * ```
    */
  get pageTestimonial(): Prisma.PageTestimonialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lead: 'Lead',
    RateLimit: 'RateLimit',
    Company: 'Company',
    WorkingHours: 'WorkingHours',
    Service: 'Service',
    ProfessionalService: 'ProfessionalService',
    User: 'User',
    Appointment: 'Appointment',
    Client: 'Client',
    CompanyPage: 'CompanyPage',
    PageTestimonial: 'PageTestimonial',
    Subscription: 'Subscription',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "lead" | "rateLimit" | "company" | "workingHours" | "service" | "professionalService" | "user" | "appointment" | "client" | "companyPage" | "pageTestimonial" | "subscription" | "payment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      RateLimit: {
        payload: Prisma.$RateLimitPayload<ExtArgs>
        fields: Prisma.RateLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RateLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RateLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findFirst: {
            args: Prisma.RateLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RateLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findMany: {
            args: Prisma.RateLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          create: {
            args: Prisma.RateLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          createMany: {
            args: Prisma.RateLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RateLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          delete: {
            args: Prisma.RateLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          update: {
            args: Prisma.RateLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          deleteMany: {
            args: Prisma.RateLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RateLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RateLimitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          upsert: {
            args: Prisma.RateLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          aggregate: {
            args: Prisma.RateLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRateLimit>
          }
          groupBy: {
            args: Prisma.RateLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<RateLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.RateLimitCountArgs<ExtArgs>
            result: $Utils.Optional<RateLimitCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      WorkingHours: {
        payload: Prisma.$WorkingHoursPayload<ExtArgs>
        fields: Prisma.WorkingHoursFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkingHoursFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkingHoursFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>
          }
          findFirst: {
            args: Prisma.WorkingHoursFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkingHoursFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>
          }
          findMany: {
            args: Prisma.WorkingHoursFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>[]
          }
          create: {
            args: Prisma.WorkingHoursCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>
          }
          createMany: {
            args: Prisma.WorkingHoursCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkingHoursCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>[]
          }
          delete: {
            args: Prisma.WorkingHoursDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>
          }
          update: {
            args: Prisma.WorkingHoursUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>
          }
          deleteMany: {
            args: Prisma.WorkingHoursDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkingHoursUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkingHoursUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>[]
          }
          upsert: {
            args: Prisma.WorkingHoursUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkingHoursPayload>
          }
          aggregate: {
            args: Prisma.WorkingHoursAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkingHours>
          }
          groupBy: {
            args: Prisma.WorkingHoursGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkingHoursGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkingHoursCountArgs<ExtArgs>
            result: $Utils.Optional<WorkingHoursCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalService: {
        payload: Prisma.$ProfessionalServicePayload<ExtArgs>
        fields: Prisma.ProfessionalServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>
          }
          findFirst: {
            args: Prisma.ProfessionalServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>
          }
          findMany: {
            args: Prisma.ProfessionalServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>[]
          }
          create: {
            args: Prisma.ProfessionalServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>
          }
          createMany: {
            args: Prisma.ProfessionalServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>[]
          }
          delete: {
            args: Prisma.ProfessionalServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>
          }
          update: {
            args: Prisma.ProfessionalServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalServicePayload>
          }
          aggregate: {
            args: Prisma.ProfessionalServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalService>
          }
          groupBy: {
            args: Prisma.ProfessionalServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalServiceCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      CompanyPage: {
        payload: Prisma.$CompanyPagePayload<ExtArgs>
        fields: Prisma.CompanyPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>
          }
          findFirst: {
            args: Prisma.CompanyPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>
          }
          findMany: {
            args: Prisma.CompanyPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>[]
          }
          create: {
            args: Prisma.CompanyPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>
          }
          createMany: {
            args: Prisma.CompanyPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>[]
          }
          delete: {
            args: Prisma.CompanyPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>
          }
          update: {
            args: Prisma.CompanyPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>
          }
          deleteMany: {
            args: Prisma.CompanyPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyPageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>[]
          }
          upsert: {
            args: Prisma.CompanyPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPagePayload>
          }
          aggregate: {
            args: Prisma.CompanyPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyPage>
          }
          groupBy: {
            args: Prisma.CompanyPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyPageCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyPageCountAggregateOutputType> | number
          }
        }
      }
      PageTestimonial: {
        payload: Prisma.$PageTestimonialPayload<ExtArgs>
        fields: Prisma.PageTestimonialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageTestimonialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageTestimonialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>
          }
          findFirst: {
            args: Prisma.PageTestimonialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageTestimonialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>
          }
          findMany: {
            args: Prisma.PageTestimonialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>[]
          }
          create: {
            args: Prisma.PageTestimonialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>
          }
          createMany: {
            args: Prisma.PageTestimonialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageTestimonialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>[]
          }
          delete: {
            args: Prisma.PageTestimonialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>
          }
          update: {
            args: Prisma.PageTestimonialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>
          }
          deleteMany: {
            args: Prisma.PageTestimonialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageTestimonialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageTestimonialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>[]
          }
          upsert: {
            args: Prisma.PageTestimonialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageTestimonialPayload>
          }
          aggregate: {
            args: Prisma.PageTestimonialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePageTestimonial>
          }
          groupBy: {
            args: Prisma.PageTestimonialGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageTestimonialGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageTestimonialCountArgs<ExtArgs>
            result: $Utils.Optional<PageTestimonialCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    lead?: LeadOmit
    rateLimit?: RateLimitOmit
    company?: CompanyOmit
    workingHours?: WorkingHoursOmit
    service?: ServiceOmit
    professionalService?: ProfessionalServiceOmit
    user?: UserOmit
    appointment?: AppointmentOmit
    client?: ClientOmit
    companyPage?: CompanyPageOmit
    pageTestimonial?: PageTestimonialOmit
    subscription?: SubscriptionOmit
    payment?: PaymentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    appointments: number
    clients: number
    workingHours: number
    services: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    appointments?: boolean | CompanyCountOutputTypeCountAppointmentsArgs
    clients?: boolean | CompanyCountOutputTypeCountClientsArgs
    workingHours?: boolean | CompanyCountOutputTypeCountWorkingHoursArgs
    services?: boolean | CompanyCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountWorkingHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkingHoursWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    appointments: number
    professionals: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | ServiceCountOutputTypeCountAppointmentsArgs
    professionals?: boolean | ServiceCountOutputTypeCountProfessionalsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountProfessionalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalServiceWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    appointments: number
    services: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | UserCountOutputTypeCountAppointmentsArgs
    services?: boolean | UserCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalServiceWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    appointments: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | ClientCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type CompanyPageCountOutputType
   */

  export type CompanyPageCountOutputType = {
    testimonials: number
  }

  export type CompanyPageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testimonials?: boolean | CompanyPageCountOutputTypeCountTestimonialsArgs
  }

  // Custom InputTypes
  /**
   * CompanyPageCountOutputType without action
   */
  export type CompanyPageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPageCountOutputType
     */
    select?: CompanyPageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyPageCountOutputType without action
   */
  export type CompanyPageCountOutputTypeCountTestimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageTestimonialWhereInput
  }


  /**
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    payments: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | SubscriptionCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    id: number | null
  }

  export type LeadSumAggregateOutputType = {
    id: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    interest: $Enums.Interest | null
    ip: string | null
    createdAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    interest: $Enums.Interest | null
    ip: string | null
    createdAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    name: number
    email: number
    interest: number
    ip: number
    createdAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    id?: true
  }

  export type LeadSumAggregateInputType = {
    id?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    interest?: true
    ip?: true
    createdAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    interest?: true
    ip?: true
    createdAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    interest?: true
    ip?: true
    createdAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: number
    name: string
    email: string
    interest: $Enums.Interest
    ip: string
    createdAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    interest?: boolean
    ip?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    interest?: boolean
    ip?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    interest?: boolean
    ip?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    interest?: boolean
    ip?: boolean
    createdAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "interest" | "ip" | "createdAt", ExtArgs["result"]["lead"]>

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      interest: $Enums.Interest
      ip: string
      createdAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'Int'>
    readonly name: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly interest: FieldRef<"Lead", 'Interest'>
    readonly ip: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
  }


  /**
   * Model RateLimit
   */

  export type AggregateRateLimit = {
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  export type RateLimitAvgAggregateOutputType = {
    id: number | null
    count: number | null
  }

  export type RateLimitSumAggregateOutputType = {
    id: number | null
    count: number | null
  }

  export type RateLimitMinAggregateOutputType = {
    id: number | null
    ip: string | null
    count: number | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RateLimitMaxAggregateOutputType = {
    id: number | null
    ip: string | null
    count: number | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RateLimitCountAggregateOutputType = {
    id: number
    ip: number
    count: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RateLimitAvgAggregateInputType = {
    id?: true
    count?: true
  }

  export type RateLimitSumAggregateInputType = {
    id?: true
    count?: true
  }

  export type RateLimitMinAggregateInputType = {
    id?: true
    ip?: true
    count?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RateLimitMaxAggregateInputType = {
    id?: true
    ip?: true
    count?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RateLimitCountAggregateInputType = {
    id?: true
    ip?: true
    count?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RateLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimit to aggregate.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RateLimits
    **/
    _count?: true | RateLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RateLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RateLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RateLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RateLimitMaxAggregateInputType
  }

  export type GetRateLimitAggregateType<T extends RateLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRateLimit[P]>
      : GetScalarType<T[P], AggregateRateLimit[P]>
  }




  export type RateLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RateLimitWhereInput
    orderBy?: RateLimitOrderByWithAggregationInput | RateLimitOrderByWithAggregationInput[]
    by: RateLimitScalarFieldEnum[] | RateLimitScalarFieldEnum
    having?: RateLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RateLimitCountAggregateInputType | true
    _avg?: RateLimitAvgAggregateInputType
    _sum?: RateLimitSumAggregateInputType
    _min?: RateLimitMinAggregateInputType
    _max?: RateLimitMaxAggregateInputType
  }

  export type RateLimitGroupByOutputType = {
    id: number
    ip: string
    count: number
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  type GetRateLimitGroupByPayload<T extends RateLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RateLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RateLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
        }
      >
    >


  export type RateLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip?: boolean
    count?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip?: boolean
    count?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip?: boolean
    count?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectScalar = {
    id?: boolean
    ip?: boolean
    count?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RateLimitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ip" | "count" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["rateLimit"]>

  export type $RateLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RateLimit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ip: string
      count: number
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rateLimit"]>
    composites: {}
  }

  type RateLimitGetPayload<S extends boolean | null | undefined | RateLimitDefaultArgs> = $Result.GetResult<Prisma.$RateLimitPayload, S>

  type RateLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RateLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RateLimitCountAggregateInputType | true
    }

  export interface RateLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RateLimit'], meta: { name: 'RateLimit' } }
    /**
     * Find zero or one RateLimit that matches the filter.
     * @param {RateLimitFindUniqueArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RateLimitFindUniqueArgs>(args: SelectSubset<T, RateLimitFindUniqueArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RateLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RateLimitFindUniqueOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RateLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, RateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RateLimitFindFirstArgs>(args?: SelectSubset<T, RateLimitFindFirstArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RateLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, RateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RateLimits
     * const rateLimits = await prisma.rateLimit.findMany()
     * 
     * // Get first 10 RateLimits
     * const rateLimits = await prisma.rateLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RateLimitFindManyArgs>(args?: SelectSubset<T, RateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RateLimit.
     * @param {RateLimitCreateArgs} args - Arguments to create a RateLimit.
     * @example
     * // Create one RateLimit
     * const RateLimit = await prisma.rateLimit.create({
     *   data: {
     *     // ... data to create a RateLimit
     *   }
     * })
     * 
     */
    create<T extends RateLimitCreateArgs>(args: SelectSubset<T, RateLimitCreateArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RateLimits.
     * @param {RateLimitCreateManyArgs} args - Arguments to create many RateLimits.
     * @example
     * // Create many RateLimits
     * const rateLimit = await prisma.rateLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RateLimitCreateManyArgs>(args?: SelectSubset<T, RateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RateLimits and returns the data saved in the database.
     * @param {RateLimitCreateManyAndReturnArgs} args - Arguments to create many RateLimits.
     * @example
     * // Create many RateLimits
     * const rateLimit = await prisma.rateLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RateLimits and only return the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RateLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, RateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RateLimit.
     * @param {RateLimitDeleteArgs} args - Arguments to delete one RateLimit.
     * @example
     * // Delete one RateLimit
     * const RateLimit = await prisma.rateLimit.delete({
     *   where: {
     *     // ... filter to delete one RateLimit
     *   }
     * })
     * 
     */
    delete<T extends RateLimitDeleteArgs>(args: SelectSubset<T, RateLimitDeleteArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RateLimit.
     * @param {RateLimitUpdateArgs} args - Arguments to update one RateLimit.
     * @example
     * // Update one RateLimit
     * const rateLimit = await prisma.rateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RateLimitUpdateArgs>(args: SelectSubset<T, RateLimitUpdateArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RateLimits.
     * @param {RateLimitDeleteManyArgs} args - Arguments to filter RateLimits to delete.
     * @example
     * // Delete a few RateLimits
     * const { count } = await prisma.rateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RateLimitDeleteManyArgs>(args?: SelectSubset<T, RateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RateLimits
     * const rateLimit = await prisma.rateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RateLimitUpdateManyArgs>(args: SelectSubset<T, RateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimits and returns the data updated in the database.
     * @param {RateLimitUpdateManyAndReturnArgs} args - Arguments to update many RateLimits.
     * @example
     * // Update many RateLimits
     * const rateLimit = await prisma.rateLimit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RateLimits and only return the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RateLimitUpdateManyAndReturnArgs>(args: SelectSubset<T, RateLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RateLimit.
     * @param {RateLimitUpsertArgs} args - Arguments to update or create a RateLimit.
     * @example
     * // Update or create a RateLimit
     * const rateLimit = await prisma.rateLimit.upsert({
     *   create: {
     *     // ... data to create a RateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RateLimit we want to update
     *   }
     * })
     */
    upsert<T extends RateLimitUpsertArgs>(args: SelectSubset<T, RateLimitUpsertArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitCountArgs} args - Arguments to filter RateLimits to count.
     * @example
     * // Count the number of RateLimits
     * const count = await prisma.rateLimit.count({
     *   where: {
     *     // ... the filter for the RateLimits we want to count
     *   }
     * })
    **/
    count<T extends RateLimitCountArgs>(
      args?: Subset<T, RateLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RateLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RateLimitAggregateArgs>(args: Subset<T, RateLimitAggregateArgs>): Prisma.PrismaPromise<GetRateLimitAggregateType<T>>

    /**
     * Group by RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RateLimitGroupByArgs['orderBy'] }
        : { orderBy?: RateLimitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RateLimit model
   */
  readonly fields: RateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RateLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RateLimit model
   */
  interface RateLimitFieldRefs {
    readonly id: FieldRef<"RateLimit", 'Int'>
    readonly ip: FieldRef<"RateLimit", 'String'>
    readonly count: FieldRef<"RateLimit", 'Int'>
    readonly expiresAt: FieldRef<"RateLimit", 'DateTime'>
    readonly createdAt: FieldRef<"RateLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"RateLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RateLimit findUnique
   */
  export type RateLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit findUniqueOrThrow
   */
  export type RateLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit findFirst
   */
  export type RateLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit findFirstOrThrow
   */
  export type RateLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit findMany
   */
  export type RateLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimits to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit create
   */
  export type RateLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data needed to create a RateLimit.
     */
    data: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
  }

  /**
   * RateLimit createMany
   */
  export type RateLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimit createManyAndReturn
   */
  export type RateLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimit update
   */
  export type RateLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data needed to update a RateLimit.
     */
    data: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
    /**
     * Choose, which RateLimit to update.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit updateMany
   */
  export type RateLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RateLimits.
     */
    data: XOR<RateLimitUpdateManyMutationInput, RateLimitUncheckedUpdateManyInput>
    /**
     * Filter which RateLimits to update
     */
    where?: RateLimitWhereInput
    /**
     * Limit how many RateLimits to update.
     */
    limit?: number
  }

  /**
   * RateLimit updateManyAndReturn
   */
  export type RateLimitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data used to update RateLimits.
     */
    data: XOR<RateLimitUpdateManyMutationInput, RateLimitUncheckedUpdateManyInput>
    /**
     * Filter which RateLimits to update
     */
    where?: RateLimitWhereInput
    /**
     * Limit how many RateLimits to update.
     */
    limit?: number
  }

  /**
   * RateLimit upsert
   */
  export type RateLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The filter to search for the RateLimit to update in case it exists.
     */
    where: RateLimitWhereUniqueInput
    /**
     * In case the RateLimit found by the `where` argument doesn't exist, create a new RateLimit with this data.
     */
    create: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
    /**
     * In case the RateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
  }

  /**
   * RateLimit delete
   */
  export type RateLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter which RateLimit to delete.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit deleteMany
   */
  export type RateLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimits to delete
     */
    where?: RateLimitWhereInput
    /**
     * Limit how many RateLimits to delete.
     */
    limit?: number
  }

  /**
   * RateLimit without action
   */
  export type RateLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    nomeFantasia: string | null
    razaoSocial: string | null
    cnpjCpf: string | null
    endereco: string | null
    telefone: string | null
    email: string | null
    contrato: $Enums.ContractType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    nomeFantasia: string | null
    razaoSocial: string | null
    cnpjCpf: string | null
    endereco: string | null
    telefone: string | null
    email: string | null
    contrato: $Enums.ContractType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    nomeFantasia: number
    razaoSocial: number
    cnpjCpf: number
    endereco: number
    telefone: number
    email: number
    contrato: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    nomeFantasia?: true
    razaoSocial?: true
    cnpjCpf?: true
    endereco?: true
    telefone?: true
    email?: true
    contrato?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    nomeFantasia?: true
    razaoSocial?: true
    cnpjCpf?: true
    endereco?: true
    telefone?: true
    email?: true
    contrato?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    nomeFantasia?: true
    razaoSocial?: true
    cnpjCpf?: true
    endereco?: true
    telefone?: true
    email?: true
    contrato?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    nomeFantasia: string
    razaoSocial: string | null
    cnpjCpf: string
    endereco: string | null
    telefone: string | null
    email: string | null
    contrato: $Enums.ContractType
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpjCpf?: boolean
    endereco?: boolean
    telefone?: boolean
    email?: boolean
    contrato?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    appointments?: boolean | Company$appointmentsArgs<ExtArgs>
    clients?: boolean | Company$clientsArgs<ExtArgs>
    workingHours?: boolean | Company$workingHoursArgs<ExtArgs>
    services?: boolean | Company$servicesArgs<ExtArgs>
    companyPage?: boolean | Company$companyPageArgs<ExtArgs>
    subscription?: boolean | Company$subscriptionArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpjCpf?: boolean
    endereco?: boolean
    telefone?: boolean
    email?: boolean
    contrato?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpjCpf?: boolean
    endereco?: boolean
    telefone?: boolean
    email?: boolean
    contrato?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpjCpf?: boolean
    endereco?: boolean
    telefone?: boolean
    email?: boolean
    contrato?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomeFantasia" | "razaoSocial" | "cnpjCpf" | "endereco" | "telefone" | "email" | "contrato" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    appointments?: boolean | Company$appointmentsArgs<ExtArgs>
    clients?: boolean | Company$clientsArgs<ExtArgs>
    workingHours?: boolean | Company$workingHoursArgs<ExtArgs>
    services?: boolean | Company$servicesArgs<ExtArgs>
    companyPage?: boolean | Company$companyPageArgs<ExtArgs>
    subscription?: boolean | Company$subscriptionArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      clients: Prisma.$ClientPayload<ExtArgs>[]
      workingHours: Prisma.$WorkingHoursPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      companyPage: Prisma.$CompanyPagePayload<ExtArgs> | null
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomeFantasia: string
      razaoSocial: string | null
      cnpjCpf: string
      endereco: string | null
      telefone: string | null
      email: string | null
      contrato: $Enums.ContractType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Company$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Company$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clients<T extends Company$clientsArgs<ExtArgs> = {}>(args?: Subset<T, Company$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workingHours<T extends Company$workingHoursArgs<ExtArgs> = {}>(args?: Subset<T, Company$workingHoursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Company$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Company$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    companyPage<T extends Company$companyPageArgs<ExtArgs> = {}>(args?: Subset<T, Company$companyPageArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subscription<T extends Company$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, Company$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly nomeFantasia: FieldRef<"Company", 'String'>
    readonly razaoSocial: FieldRef<"Company", 'String'>
    readonly cnpjCpf: FieldRef<"Company", 'String'>
    readonly endereco: FieldRef<"Company", 'String'>
    readonly telefone: FieldRef<"Company", 'String'>
    readonly email: FieldRef<"Company", 'String'>
    readonly contrato: FieldRef<"Company", 'ContractType'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.appointments
   */
  export type Company$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Company.clients
   */
  export type Company$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Company.workingHours
   */
  export type Company$workingHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    where?: WorkingHoursWhereInput
    orderBy?: WorkingHoursOrderByWithRelationInput | WorkingHoursOrderByWithRelationInput[]
    cursor?: WorkingHoursWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkingHoursScalarFieldEnum | WorkingHoursScalarFieldEnum[]
  }

  /**
   * Company.services
   */
  export type Company$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Company.companyPage
   */
  export type Company$companyPageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    where?: CompanyPageWhereInput
  }

  /**
   * Company.subscription
   */
  export type Company$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model WorkingHours
   */

  export type AggregateWorkingHours = {
    _count: WorkingHoursCountAggregateOutputType | null
    _avg: WorkingHoursAvgAggregateOutputType | null
    _sum: WorkingHoursSumAggregateOutputType | null
    _min: WorkingHoursMinAggregateOutputType | null
    _max: WorkingHoursMaxAggregateOutputType | null
  }

  export type WorkingHoursAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type WorkingHoursSumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type WorkingHoursMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    dayOfWeek: number | null
    openTime: string | null
    closeTime: string | null
  }

  export type WorkingHoursMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    dayOfWeek: number | null
    openTime: string | null
    closeTime: string | null
  }

  export type WorkingHoursCountAggregateOutputType = {
    id: number
    companyId: number
    dayOfWeek: number
    openTime: number
    closeTime: number
    _all: number
  }


  export type WorkingHoursAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type WorkingHoursSumAggregateInputType = {
    dayOfWeek?: true
  }

  export type WorkingHoursMinAggregateInputType = {
    id?: true
    companyId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
  }

  export type WorkingHoursMaxAggregateInputType = {
    id?: true
    companyId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
  }

  export type WorkingHoursCountAggregateInputType = {
    id?: true
    companyId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
    _all?: true
  }

  export type WorkingHoursAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkingHours to aggregate.
     */
    where?: WorkingHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHoursOrderByWithRelationInput | WorkingHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkingHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkingHours
    **/
    _count?: true | WorkingHoursCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkingHoursAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkingHoursSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkingHoursMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkingHoursMaxAggregateInputType
  }

  export type GetWorkingHoursAggregateType<T extends WorkingHoursAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkingHours]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkingHours[P]>
      : GetScalarType<T[P], AggregateWorkingHours[P]>
  }




  export type WorkingHoursGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkingHoursWhereInput
    orderBy?: WorkingHoursOrderByWithAggregationInput | WorkingHoursOrderByWithAggregationInput[]
    by: WorkingHoursScalarFieldEnum[] | WorkingHoursScalarFieldEnum
    having?: WorkingHoursScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkingHoursCountAggregateInputType | true
    _avg?: WorkingHoursAvgAggregateInputType
    _sum?: WorkingHoursSumAggregateInputType
    _min?: WorkingHoursMinAggregateInputType
    _max?: WorkingHoursMaxAggregateInputType
  }

  export type WorkingHoursGroupByOutputType = {
    id: string
    companyId: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    _count: WorkingHoursCountAggregateOutputType | null
    _avg: WorkingHoursAvgAggregateOutputType | null
    _sum: WorkingHoursSumAggregateOutputType | null
    _min: WorkingHoursMinAggregateOutputType | null
    _max: WorkingHoursMaxAggregateOutputType | null
  }

  type GetWorkingHoursGroupByPayload<T extends WorkingHoursGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkingHoursGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkingHoursGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkingHoursGroupByOutputType[P]>
            : GetScalarType<T[P], WorkingHoursGroupByOutputType[P]>
        }
      >
    >


  export type WorkingHoursSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workingHours"]>

  export type WorkingHoursSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workingHours"]>

  export type WorkingHoursSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workingHours"]>

  export type WorkingHoursSelectScalar = {
    id?: boolean
    companyId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
  }

  export type WorkingHoursOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "dayOfWeek" | "openTime" | "closeTime", ExtArgs["result"]["workingHours"]>
  export type WorkingHoursInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WorkingHoursIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WorkingHoursIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $WorkingHoursPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkingHours"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      dayOfWeek: number
      openTime: string
      closeTime: string
    }, ExtArgs["result"]["workingHours"]>
    composites: {}
  }

  type WorkingHoursGetPayload<S extends boolean | null | undefined | WorkingHoursDefaultArgs> = $Result.GetResult<Prisma.$WorkingHoursPayload, S>

  type WorkingHoursCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkingHoursFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkingHoursCountAggregateInputType | true
    }

  export interface WorkingHoursDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkingHours'], meta: { name: 'WorkingHours' } }
    /**
     * Find zero or one WorkingHours that matches the filter.
     * @param {WorkingHoursFindUniqueArgs} args - Arguments to find a WorkingHours
     * @example
     * // Get one WorkingHours
     * const workingHours = await prisma.workingHours.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkingHoursFindUniqueArgs>(args: SelectSubset<T, WorkingHoursFindUniqueArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkingHours that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkingHoursFindUniqueOrThrowArgs} args - Arguments to find a WorkingHours
     * @example
     * // Get one WorkingHours
     * const workingHours = await prisma.workingHours.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkingHoursFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkingHoursFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkingHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursFindFirstArgs} args - Arguments to find a WorkingHours
     * @example
     * // Get one WorkingHours
     * const workingHours = await prisma.workingHours.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkingHoursFindFirstArgs>(args?: SelectSubset<T, WorkingHoursFindFirstArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkingHours that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursFindFirstOrThrowArgs} args - Arguments to find a WorkingHours
     * @example
     * // Get one WorkingHours
     * const workingHours = await prisma.workingHours.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkingHoursFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkingHoursFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkingHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkingHours
     * const workingHours = await prisma.workingHours.findMany()
     * 
     * // Get first 10 WorkingHours
     * const workingHours = await prisma.workingHours.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workingHoursWithIdOnly = await prisma.workingHours.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkingHoursFindManyArgs>(args?: SelectSubset<T, WorkingHoursFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkingHours.
     * @param {WorkingHoursCreateArgs} args - Arguments to create a WorkingHours.
     * @example
     * // Create one WorkingHours
     * const WorkingHours = await prisma.workingHours.create({
     *   data: {
     *     // ... data to create a WorkingHours
     *   }
     * })
     * 
     */
    create<T extends WorkingHoursCreateArgs>(args: SelectSubset<T, WorkingHoursCreateArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkingHours.
     * @param {WorkingHoursCreateManyArgs} args - Arguments to create many WorkingHours.
     * @example
     * // Create many WorkingHours
     * const workingHours = await prisma.workingHours.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkingHoursCreateManyArgs>(args?: SelectSubset<T, WorkingHoursCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkingHours and returns the data saved in the database.
     * @param {WorkingHoursCreateManyAndReturnArgs} args - Arguments to create many WorkingHours.
     * @example
     * // Create many WorkingHours
     * const workingHours = await prisma.workingHours.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkingHours and only return the `id`
     * const workingHoursWithIdOnly = await prisma.workingHours.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkingHoursCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkingHoursCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkingHours.
     * @param {WorkingHoursDeleteArgs} args - Arguments to delete one WorkingHours.
     * @example
     * // Delete one WorkingHours
     * const WorkingHours = await prisma.workingHours.delete({
     *   where: {
     *     // ... filter to delete one WorkingHours
     *   }
     * })
     * 
     */
    delete<T extends WorkingHoursDeleteArgs>(args: SelectSubset<T, WorkingHoursDeleteArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkingHours.
     * @param {WorkingHoursUpdateArgs} args - Arguments to update one WorkingHours.
     * @example
     * // Update one WorkingHours
     * const workingHours = await prisma.workingHours.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkingHoursUpdateArgs>(args: SelectSubset<T, WorkingHoursUpdateArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkingHours.
     * @param {WorkingHoursDeleteManyArgs} args - Arguments to filter WorkingHours to delete.
     * @example
     * // Delete a few WorkingHours
     * const { count } = await prisma.workingHours.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkingHoursDeleteManyArgs>(args?: SelectSubset<T, WorkingHoursDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkingHours
     * const workingHours = await prisma.workingHours.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkingHoursUpdateManyArgs>(args: SelectSubset<T, WorkingHoursUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkingHours and returns the data updated in the database.
     * @param {WorkingHoursUpdateManyAndReturnArgs} args - Arguments to update many WorkingHours.
     * @example
     * // Update many WorkingHours
     * const workingHours = await prisma.workingHours.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkingHours and only return the `id`
     * const workingHoursWithIdOnly = await prisma.workingHours.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkingHoursUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkingHoursUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkingHours.
     * @param {WorkingHoursUpsertArgs} args - Arguments to update or create a WorkingHours.
     * @example
     * // Update or create a WorkingHours
     * const workingHours = await prisma.workingHours.upsert({
     *   create: {
     *     // ... data to create a WorkingHours
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkingHours we want to update
     *   }
     * })
     */
    upsert<T extends WorkingHoursUpsertArgs>(args: SelectSubset<T, WorkingHoursUpsertArgs<ExtArgs>>): Prisma__WorkingHoursClient<$Result.GetResult<Prisma.$WorkingHoursPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursCountArgs} args - Arguments to filter WorkingHours to count.
     * @example
     * // Count the number of WorkingHours
     * const count = await prisma.workingHours.count({
     *   where: {
     *     // ... the filter for the WorkingHours we want to count
     *   }
     * })
    **/
    count<T extends WorkingHoursCountArgs>(
      args?: Subset<T, WorkingHoursCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkingHoursCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkingHoursAggregateArgs>(args: Subset<T, WorkingHoursAggregateArgs>): Prisma.PrismaPromise<GetWorkingHoursAggregateType<T>>

    /**
     * Group by WorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkingHoursGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkingHoursGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkingHoursGroupByArgs['orderBy'] }
        : { orderBy?: WorkingHoursGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkingHoursGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkingHoursGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkingHours model
   */
  readonly fields: WorkingHoursFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkingHours.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkingHoursClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkingHours model
   */
  interface WorkingHoursFieldRefs {
    readonly id: FieldRef<"WorkingHours", 'String'>
    readonly companyId: FieldRef<"WorkingHours", 'String'>
    readonly dayOfWeek: FieldRef<"WorkingHours", 'Int'>
    readonly openTime: FieldRef<"WorkingHours", 'String'>
    readonly closeTime: FieldRef<"WorkingHours", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkingHours findUnique
   */
  export type WorkingHoursFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHours to fetch.
     */
    where: WorkingHoursWhereUniqueInput
  }

  /**
   * WorkingHours findUniqueOrThrow
   */
  export type WorkingHoursFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHours to fetch.
     */
    where: WorkingHoursWhereUniqueInput
  }

  /**
   * WorkingHours findFirst
   */
  export type WorkingHoursFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHours to fetch.
     */
    where?: WorkingHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHoursOrderByWithRelationInput | WorkingHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkingHours.
     */
    cursor?: WorkingHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkingHours.
     */
    distinct?: WorkingHoursScalarFieldEnum | WorkingHoursScalarFieldEnum[]
  }

  /**
   * WorkingHours findFirstOrThrow
   */
  export type WorkingHoursFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHours to fetch.
     */
    where?: WorkingHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHoursOrderByWithRelationInput | WorkingHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkingHours.
     */
    cursor?: WorkingHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkingHours.
     */
    distinct?: WorkingHoursScalarFieldEnum | WorkingHoursScalarFieldEnum[]
  }

  /**
   * WorkingHours findMany
   */
  export type WorkingHoursFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * Filter, which WorkingHours to fetch.
     */
    where?: WorkingHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkingHours to fetch.
     */
    orderBy?: WorkingHoursOrderByWithRelationInput | WorkingHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkingHours.
     */
    cursor?: WorkingHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkingHours.
     */
    skip?: number
    distinct?: WorkingHoursScalarFieldEnum | WorkingHoursScalarFieldEnum[]
  }

  /**
   * WorkingHours create
   */
  export type WorkingHoursCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkingHours.
     */
    data: XOR<WorkingHoursCreateInput, WorkingHoursUncheckedCreateInput>
  }

  /**
   * WorkingHours createMany
   */
  export type WorkingHoursCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkingHours.
     */
    data: WorkingHoursCreateManyInput | WorkingHoursCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkingHours createManyAndReturn
   */
  export type WorkingHoursCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * The data used to create many WorkingHours.
     */
    data: WorkingHoursCreateManyInput | WorkingHoursCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkingHours update
   */
  export type WorkingHoursUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkingHours.
     */
    data: XOR<WorkingHoursUpdateInput, WorkingHoursUncheckedUpdateInput>
    /**
     * Choose, which WorkingHours to update.
     */
    where: WorkingHoursWhereUniqueInput
  }

  /**
   * WorkingHours updateMany
   */
  export type WorkingHoursUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkingHours.
     */
    data: XOR<WorkingHoursUpdateManyMutationInput, WorkingHoursUncheckedUpdateManyInput>
    /**
     * Filter which WorkingHours to update
     */
    where?: WorkingHoursWhereInput
    /**
     * Limit how many WorkingHours to update.
     */
    limit?: number
  }

  /**
   * WorkingHours updateManyAndReturn
   */
  export type WorkingHoursUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * The data used to update WorkingHours.
     */
    data: XOR<WorkingHoursUpdateManyMutationInput, WorkingHoursUncheckedUpdateManyInput>
    /**
     * Filter which WorkingHours to update
     */
    where?: WorkingHoursWhereInput
    /**
     * Limit how many WorkingHours to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkingHours upsert
   */
  export type WorkingHoursUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkingHours to update in case it exists.
     */
    where: WorkingHoursWhereUniqueInput
    /**
     * In case the WorkingHours found by the `where` argument doesn't exist, create a new WorkingHours with this data.
     */
    create: XOR<WorkingHoursCreateInput, WorkingHoursUncheckedCreateInput>
    /**
     * In case the WorkingHours was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkingHoursUpdateInput, WorkingHoursUncheckedUpdateInput>
  }

  /**
   * WorkingHours delete
   */
  export type WorkingHoursDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
    /**
     * Filter which WorkingHours to delete.
     */
    where: WorkingHoursWhereUniqueInput
  }

  /**
   * WorkingHours deleteMany
   */
  export type WorkingHoursDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkingHours to delete
     */
    where?: WorkingHoursWhereInput
    /**
     * Limit how many WorkingHours to delete.
     */
    limit?: number
  }

  /**
   * WorkingHours without action
   */
  export type WorkingHoursDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkingHours
     */
    select?: WorkingHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkingHours
     */
    omit?: WorkingHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkingHoursInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: number | null
    duration: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: number | null
    duration: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    price: number | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    price: number | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    price: number
    duration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    duration?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    duration?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    price?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    price?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    price?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    companyId: string
    name: string
    price: number
    duration: number
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    professionals?: boolean | Service$professionalsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "name" | "price" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    professionals?: boolean | Service$professionalsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      professionals: Prisma.$ProfessionalServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      name: string
      price: number
      duration: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointments<T extends Service$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Service$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionals<T extends Service$professionalsArgs<ExtArgs> = {}>(args?: Subset<T, Service$professionalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly companyId: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Float'>
    readonly duration: FieldRef<"Service", 'Int'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.appointments
   */
  export type Service$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Service.professionals
   */
  export type Service$professionalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    where?: ProfessionalServiceWhereInput
    orderBy?: ProfessionalServiceOrderByWithRelationInput | ProfessionalServiceOrderByWithRelationInput[]
    cursor?: ProfessionalServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalServiceScalarFieldEnum | ProfessionalServiceScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalService
   */

  export type AggregateProfessionalService = {
    _count: ProfessionalServiceCountAggregateOutputType | null
    _min: ProfessionalServiceMinAggregateOutputType | null
    _max: ProfessionalServiceMaxAggregateOutputType | null
  }

  export type ProfessionalServiceMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    serviceId: string | null
  }

  export type ProfessionalServiceMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    serviceId: string | null
  }

  export type ProfessionalServiceCountAggregateOutputType = {
    id: number
    professionalId: number
    serviceId: number
    _all: number
  }


  export type ProfessionalServiceMinAggregateInputType = {
    id?: true
    professionalId?: true
    serviceId?: true
  }

  export type ProfessionalServiceMaxAggregateInputType = {
    id?: true
    professionalId?: true
    serviceId?: true
  }

  export type ProfessionalServiceCountAggregateInputType = {
    id?: true
    professionalId?: true
    serviceId?: true
    _all?: true
  }

  export type ProfessionalServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalService to aggregate.
     */
    where?: ProfessionalServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalServices to fetch.
     */
    orderBy?: ProfessionalServiceOrderByWithRelationInput | ProfessionalServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalServices
    **/
    _count?: true | ProfessionalServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalServiceMaxAggregateInputType
  }

  export type GetProfessionalServiceAggregateType<T extends ProfessionalServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalService[P]>
      : GetScalarType<T[P], AggregateProfessionalService[P]>
  }




  export type ProfessionalServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalServiceWhereInput
    orderBy?: ProfessionalServiceOrderByWithAggregationInput | ProfessionalServiceOrderByWithAggregationInput[]
    by: ProfessionalServiceScalarFieldEnum[] | ProfessionalServiceScalarFieldEnum
    having?: ProfessionalServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalServiceCountAggregateInputType | true
    _min?: ProfessionalServiceMinAggregateInputType
    _max?: ProfessionalServiceMaxAggregateInputType
  }

  export type ProfessionalServiceGroupByOutputType = {
    id: string
    professionalId: string
    serviceId: string
    _count: ProfessionalServiceCountAggregateOutputType | null
    _min: ProfessionalServiceMinAggregateOutputType | null
    _max: ProfessionalServiceMaxAggregateOutputType | null
  }

  type GetProfessionalServiceGroupByPayload<T extends ProfessionalServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalServiceGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    serviceId?: boolean
    professional?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalService"]>

  export type ProfessionalServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    serviceId?: boolean
    professional?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalService"]>

  export type ProfessionalServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    serviceId?: boolean
    professional?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalService"]>

  export type ProfessionalServiceSelectScalar = {
    id?: boolean
    professionalId?: boolean
    serviceId?: boolean
  }

  export type ProfessionalServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "serviceId", ExtArgs["result"]["professionalService"]>
  export type ProfessionalServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ProfessionalServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ProfessionalServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | UserDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ProfessionalServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalService"
    objects: {
      professional: Prisma.$UserPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      serviceId: string
    }, ExtArgs["result"]["professionalService"]>
    composites: {}
  }

  type ProfessionalServiceGetPayload<S extends boolean | null | undefined | ProfessionalServiceDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalServicePayload, S>

  type ProfessionalServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalServiceCountAggregateInputType | true
    }

  export interface ProfessionalServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalService'], meta: { name: 'ProfessionalService' } }
    /**
     * Find zero or one ProfessionalService that matches the filter.
     * @param {ProfessionalServiceFindUniqueArgs} args - Arguments to find a ProfessionalService
     * @example
     * // Get one ProfessionalService
     * const professionalService = await prisma.professionalService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalServiceFindUniqueArgs>(args: SelectSubset<T, ProfessionalServiceFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalService that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalServiceFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalService
     * @example
     * // Get one ProfessionalService
     * const professionalService = await prisma.professionalService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceFindFirstArgs} args - Arguments to find a ProfessionalService
     * @example
     * // Get one ProfessionalService
     * const professionalService = await prisma.professionalService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalServiceFindFirstArgs>(args?: SelectSubset<T, ProfessionalServiceFindFirstArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceFindFirstOrThrowArgs} args - Arguments to find a ProfessionalService
     * @example
     * // Get one ProfessionalService
     * const professionalService = await prisma.professionalService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalServices
     * const professionalServices = await prisma.professionalService.findMany()
     * 
     * // Get first 10 ProfessionalServices
     * const professionalServices = await prisma.professionalService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalServiceWithIdOnly = await prisma.professionalService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalServiceFindManyArgs>(args?: SelectSubset<T, ProfessionalServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalService.
     * @param {ProfessionalServiceCreateArgs} args - Arguments to create a ProfessionalService.
     * @example
     * // Create one ProfessionalService
     * const ProfessionalService = await prisma.professionalService.create({
     *   data: {
     *     // ... data to create a ProfessionalService
     *   }
     * })
     * 
     */
    create<T extends ProfessionalServiceCreateArgs>(args: SelectSubset<T, ProfessionalServiceCreateArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalServices.
     * @param {ProfessionalServiceCreateManyArgs} args - Arguments to create many ProfessionalServices.
     * @example
     * // Create many ProfessionalServices
     * const professionalService = await prisma.professionalService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalServiceCreateManyArgs>(args?: SelectSubset<T, ProfessionalServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalServices and returns the data saved in the database.
     * @param {ProfessionalServiceCreateManyAndReturnArgs} args - Arguments to create many ProfessionalServices.
     * @example
     * // Create many ProfessionalServices
     * const professionalService = await prisma.professionalService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalServices and only return the `id`
     * const professionalServiceWithIdOnly = await prisma.professionalService.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalService.
     * @param {ProfessionalServiceDeleteArgs} args - Arguments to delete one ProfessionalService.
     * @example
     * // Delete one ProfessionalService
     * const ProfessionalService = await prisma.professionalService.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalService
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalServiceDeleteArgs>(args: SelectSubset<T, ProfessionalServiceDeleteArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalService.
     * @param {ProfessionalServiceUpdateArgs} args - Arguments to update one ProfessionalService.
     * @example
     * // Update one ProfessionalService
     * const professionalService = await prisma.professionalService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalServiceUpdateArgs>(args: SelectSubset<T, ProfessionalServiceUpdateArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalServices.
     * @param {ProfessionalServiceDeleteManyArgs} args - Arguments to filter ProfessionalServices to delete.
     * @example
     * // Delete a few ProfessionalServices
     * const { count } = await prisma.professionalService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalServiceDeleteManyArgs>(args?: SelectSubset<T, ProfessionalServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalServices
     * const professionalService = await prisma.professionalService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalServiceUpdateManyArgs>(args: SelectSubset<T, ProfessionalServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalServices and returns the data updated in the database.
     * @param {ProfessionalServiceUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalServices.
     * @example
     * // Update many ProfessionalServices
     * const professionalService = await prisma.professionalService.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalServices and only return the `id`
     * const professionalServiceWithIdOnly = await prisma.professionalService.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalService.
     * @param {ProfessionalServiceUpsertArgs} args - Arguments to update or create a ProfessionalService.
     * @example
     * // Update or create a ProfessionalService
     * const professionalService = await prisma.professionalService.upsert({
     *   create: {
     *     // ... data to create a ProfessionalService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalService we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalServiceUpsertArgs>(args: SelectSubset<T, ProfessionalServiceUpsertArgs<ExtArgs>>): Prisma__ProfessionalServiceClient<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceCountArgs} args - Arguments to filter ProfessionalServices to count.
     * @example
     * // Count the number of ProfessionalServices
     * const count = await prisma.professionalService.count({
     *   where: {
     *     // ... the filter for the ProfessionalServices we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalServiceCountArgs>(
      args?: Subset<T, ProfessionalServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalServiceAggregateArgs>(args: Subset<T, ProfessionalServiceAggregateArgs>): Prisma.PrismaPromise<GetProfessionalServiceAggregateType<T>>

    /**
     * Group by ProfessionalService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalServiceGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalService model
   */
  readonly fields: ProfessionalServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalService model
   */
  interface ProfessionalServiceFieldRefs {
    readonly id: FieldRef<"ProfessionalService", 'String'>
    readonly professionalId: FieldRef<"ProfessionalService", 'String'>
    readonly serviceId: FieldRef<"ProfessionalService", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalService findUnique
   */
  export type ProfessionalServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalService to fetch.
     */
    where: ProfessionalServiceWhereUniqueInput
  }

  /**
   * ProfessionalService findUniqueOrThrow
   */
  export type ProfessionalServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalService to fetch.
     */
    where: ProfessionalServiceWhereUniqueInput
  }

  /**
   * ProfessionalService findFirst
   */
  export type ProfessionalServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalService to fetch.
     */
    where?: ProfessionalServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalServices to fetch.
     */
    orderBy?: ProfessionalServiceOrderByWithRelationInput | ProfessionalServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalServices.
     */
    cursor?: ProfessionalServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalServices.
     */
    distinct?: ProfessionalServiceScalarFieldEnum | ProfessionalServiceScalarFieldEnum[]
  }

  /**
   * ProfessionalService findFirstOrThrow
   */
  export type ProfessionalServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalService to fetch.
     */
    where?: ProfessionalServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalServices to fetch.
     */
    orderBy?: ProfessionalServiceOrderByWithRelationInput | ProfessionalServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalServices.
     */
    cursor?: ProfessionalServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalServices.
     */
    distinct?: ProfessionalServiceScalarFieldEnum | ProfessionalServiceScalarFieldEnum[]
  }

  /**
   * ProfessionalService findMany
   */
  export type ProfessionalServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalServices to fetch.
     */
    where?: ProfessionalServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalServices to fetch.
     */
    orderBy?: ProfessionalServiceOrderByWithRelationInput | ProfessionalServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalServices.
     */
    cursor?: ProfessionalServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalServices.
     */
    skip?: number
    distinct?: ProfessionalServiceScalarFieldEnum | ProfessionalServiceScalarFieldEnum[]
  }

  /**
   * ProfessionalService create
   */
  export type ProfessionalServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalService.
     */
    data: XOR<ProfessionalServiceCreateInput, ProfessionalServiceUncheckedCreateInput>
  }

  /**
   * ProfessionalService createMany
   */
  export type ProfessionalServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalServices.
     */
    data: ProfessionalServiceCreateManyInput | ProfessionalServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalService createManyAndReturn
   */
  export type ProfessionalServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalServices.
     */
    data: ProfessionalServiceCreateManyInput | ProfessionalServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalService update
   */
  export type ProfessionalServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalService.
     */
    data: XOR<ProfessionalServiceUpdateInput, ProfessionalServiceUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalService to update.
     */
    where: ProfessionalServiceWhereUniqueInput
  }

  /**
   * ProfessionalService updateMany
   */
  export type ProfessionalServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalServices.
     */
    data: XOR<ProfessionalServiceUpdateManyMutationInput, ProfessionalServiceUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalServices to update
     */
    where?: ProfessionalServiceWhereInput
    /**
     * Limit how many ProfessionalServices to update.
     */
    limit?: number
  }

  /**
   * ProfessionalService updateManyAndReturn
   */
  export type ProfessionalServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalServices.
     */
    data: XOR<ProfessionalServiceUpdateManyMutationInput, ProfessionalServiceUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalServices to update
     */
    where?: ProfessionalServiceWhereInput
    /**
     * Limit how many ProfessionalServices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalService upsert
   */
  export type ProfessionalServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalService to update in case it exists.
     */
    where: ProfessionalServiceWhereUniqueInput
    /**
     * In case the ProfessionalService found by the `where` argument doesn't exist, create a new ProfessionalService with this data.
     */
    create: XOR<ProfessionalServiceCreateInput, ProfessionalServiceUncheckedCreateInput>
    /**
     * In case the ProfessionalService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalServiceUpdateInput, ProfessionalServiceUncheckedUpdateInput>
  }

  /**
   * ProfessionalService delete
   */
  export type ProfessionalServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalService to delete.
     */
    where: ProfessionalServiceWhereUniqueInput
  }

  /**
   * ProfessionalService deleteMany
   */
  export type ProfessionalServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalServices to delete
     */
    where?: ProfessionalServiceWhereInput
    /**
     * Limit how many ProfessionalServices to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalService without action
   */
  export type ProfessionalServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    companyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    companyId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    services?: boolean | User$servicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "companyId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    services?: boolean | User$servicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      services: Prisma.$ProfessionalServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.Role
      companyId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends User$companyArgs<ExtArgs> = {}>(args?: Subset<T, User$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appointments<T extends User$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends User$servicesArgs<ExtArgs> = {}>(args?: Subset<T, User$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly companyId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.company
   */
  export type User$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * User.appointments
   */
  export type User$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.services
   */
  export type User$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalService
     */
    select?: ProfessionalServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalService
     */
    omit?: ProfessionalServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalServiceInclude<ExtArgs> | null
    where?: ProfessionalServiceWhereInput
    orderBy?: ProfessionalServiceOrderByWithRelationInput | ProfessionalServiceOrderByWithRelationInput[]
    cursor?: ProfessionalServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalServiceScalarFieldEnum | ProfessionalServiceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    price: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    price: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    professionalId: string | null
    clientName: string | null
    clientId: string | null
    serviceId: string | null
    price: number | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.AppointmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    professionalId: string | null
    clientName: string | null
    clientId: string | null
    serviceId: string | null
    price: number | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.AppointmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    companyId: number
    professionalId: number
    clientName: number
    clientId: number
    serviceId: number
    price: number
    startTime: number
    endTime: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    price?: true
  }

  export type AppointmentSumAggregateInputType = {
    price?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    companyId?: true
    professionalId?: true
    clientName?: true
    clientId?: true
    serviceId?: true
    price?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    companyId?: true
    professionalId?: true
    clientName?: true
    clientId?: true
    serviceId?: true
    price?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    companyId?: true
    professionalId?: true
    clientName?: true
    clientId?: true
    serviceId?: true
    price?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    companyId: string
    professionalId: string
    clientName: string
    clientId: string | null
    serviceId: string
    price: number | null
    startTime: Date
    endTime: Date
    status: $Enums.AppointmentStatus
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    professionalId?: boolean
    clientName?: boolean
    clientId?: boolean
    serviceId?: boolean
    price?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    professional?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Appointment$clientArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    professionalId?: boolean
    clientName?: boolean
    clientId?: boolean
    serviceId?: boolean
    price?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    professional?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Appointment$clientArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    professionalId?: boolean
    clientName?: boolean
    clientId?: boolean
    serviceId?: boolean
    price?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    professional?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Appointment$clientArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    companyId?: boolean
    professionalId?: boolean
    clientName?: boolean
    clientId?: boolean
    serviceId?: boolean
    price?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "professionalId" | "clientName" | "clientId" | "serviceId" | "price" | "startTime" | "endTime" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    professional?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Appointment$clientArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    professional?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Appointment$clientArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    professional?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | Appointment$clientArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      professional: Prisma.$UserPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs> | null
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      professionalId: string
      clientName: string
      clientId: string | null
      serviceId: string
      price: number | null
      startTime: Date
      endTime: Date
      status: $Enums.AppointmentStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professional<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends Appointment$clientArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly companyId: FieldRef<"Appointment", 'String'>
    readonly professionalId: FieldRef<"Appointment", 'String'>
    readonly clientName: FieldRef<"Appointment", 'String'>
    readonly clientId: FieldRef<"Appointment", 'String'>
    readonly serviceId: FieldRef<"Appointment", 'String'>
    readonly price: FieldRef<"Appointment", 'Float'>
    readonly startTime: FieldRef<"Appointment", 'DateTime'>
    readonly endTime: FieldRef<"Appointment", 'DateTime'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment.client
   */
  export type Appointment$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    email: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    email: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    email: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    email?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    email?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    email?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    companyId: string
    name: string
    email: string | null
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    appointments?: boolean | Client$appointmentsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "name" | "email" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    appointments?: boolean | Client$appointmentsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      name: string
      email: string | null
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointments<T extends Client$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Client$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly companyId: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.appointments
   */
  export type Client$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model CompanyPage
   */

  export type AggregateCompanyPage = {
    _count: CompanyPageCountAggregateOutputType | null
    _min: CompanyPageMinAggregateOutputType | null
    _max: CompanyPageMaxAggregateOutputType | null
  }

  export type CompanyPageMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    slug: string | null
    title: string | null
    description: string | null
    logo: string | null
    coverImage: string | null
    primaryColor: string | null
    accentColor: string | null
    whatsapp: string | null
    instagram: string | null
    facebook: string | null
    address: string | null
    showServices: boolean | null
    showTestimonials: boolean | null
    showAbout: boolean | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyPageMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    slug: string | null
    title: string | null
    description: string | null
    logo: string | null
    coverImage: string | null
    primaryColor: string | null
    accentColor: string | null
    whatsapp: string | null
    instagram: string | null
    facebook: string | null
    address: string | null
    showServices: boolean | null
    showTestimonials: boolean | null
    showAbout: boolean | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyPageCountAggregateOutputType = {
    id: number
    companyId: number
    slug: number
    title: number
    description: number
    logo: number
    coverImage: number
    primaryColor: number
    accentColor: number
    whatsapp: number
    instagram: number
    facebook: number
    address: number
    showServices: number
    showTestimonials: number
    showAbout: number
    metaTitle: number
    metaDescription: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyPageMinAggregateInputType = {
    id?: true
    companyId?: true
    slug?: true
    title?: true
    description?: true
    logo?: true
    coverImage?: true
    primaryColor?: true
    accentColor?: true
    whatsapp?: true
    instagram?: true
    facebook?: true
    address?: true
    showServices?: true
    showTestimonials?: true
    showAbout?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyPageMaxAggregateInputType = {
    id?: true
    companyId?: true
    slug?: true
    title?: true
    description?: true
    logo?: true
    coverImage?: true
    primaryColor?: true
    accentColor?: true
    whatsapp?: true
    instagram?: true
    facebook?: true
    address?: true
    showServices?: true
    showTestimonials?: true
    showAbout?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyPageCountAggregateInputType = {
    id?: true
    companyId?: true
    slug?: true
    title?: true
    description?: true
    logo?: true
    coverImage?: true
    primaryColor?: true
    accentColor?: true
    whatsapp?: true
    instagram?: true
    facebook?: true
    address?: true
    showServices?: true
    showTestimonials?: true
    showAbout?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyPage to aggregate.
     */
    where?: CompanyPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPages to fetch.
     */
    orderBy?: CompanyPageOrderByWithRelationInput | CompanyPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyPages
    **/
    _count?: true | CompanyPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyPageMaxAggregateInputType
  }

  export type GetCompanyPageAggregateType<T extends CompanyPageAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyPage[P]>
      : GetScalarType<T[P], AggregateCompanyPage[P]>
  }




  export type CompanyPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyPageWhereInput
    orderBy?: CompanyPageOrderByWithAggregationInput | CompanyPageOrderByWithAggregationInput[]
    by: CompanyPageScalarFieldEnum[] | CompanyPageScalarFieldEnum
    having?: CompanyPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyPageCountAggregateInputType | true
    _min?: CompanyPageMinAggregateInputType
    _max?: CompanyPageMaxAggregateInputType
  }

  export type CompanyPageGroupByOutputType = {
    id: string
    companyId: string
    slug: string
    title: string
    description: string | null
    logo: string | null
    coverImage: string | null
    primaryColor: string
    accentColor: string
    whatsapp: string | null
    instagram: string | null
    facebook: string | null
    address: string | null
    showServices: boolean
    showTestimonials: boolean
    showAbout: boolean
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyPageCountAggregateOutputType | null
    _min: CompanyPageMinAggregateOutputType | null
    _max: CompanyPageMaxAggregateOutputType | null
  }

  type GetCompanyPageGroupByPayload<T extends CompanyPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyPageGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyPageGroupByOutputType[P]>
        }
      >
    >


  export type CompanyPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    logo?: boolean
    coverImage?: boolean
    primaryColor?: boolean
    accentColor?: boolean
    whatsapp?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    testimonials?: boolean | CompanyPage$testimonialsArgs<ExtArgs>
    _count?: boolean | CompanyPageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyPage"]>

  export type CompanyPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    logo?: boolean
    coverImage?: boolean
    primaryColor?: boolean
    accentColor?: boolean
    whatsapp?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyPage"]>

  export type CompanyPageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    logo?: boolean
    coverImage?: boolean
    primaryColor?: boolean
    accentColor?: boolean
    whatsapp?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyPage"]>

  export type CompanyPageSelectScalar = {
    id?: boolean
    companyId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    logo?: boolean
    coverImage?: boolean
    primaryColor?: boolean
    accentColor?: boolean
    whatsapp?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "slug" | "title" | "description" | "logo" | "coverImage" | "primaryColor" | "accentColor" | "whatsapp" | "instagram" | "facebook" | "address" | "showServices" | "showTestimonials" | "showAbout" | "metaTitle" | "metaDescription" | "createdAt" | "updatedAt", ExtArgs["result"]["companyPage"]>
  export type CompanyPageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    testimonials?: boolean | CompanyPage$testimonialsArgs<ExtArgs>
    _count?: boolean | CompanyPageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyPageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyPageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CompanyPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyPage"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      testimonials: Prisma.$PageTestimonialPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      slug: string
      title: string
      description: string | null
      logo: string | null
      coverImage: string | null
      primaryColor: string
      accentColor: string
      whatsapp: string | null
      instagram: string | null
      facebook: string | null
      address: string | null
      showServices: boolean
      showTestimonials: boolean
      showAbout: boolean
      metaTitle: string | null
      metaDescription: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["companyPage"]>
    composites: {}
  }

  type CompanyPageGetPayload<S extends boolean | null | undefined | CompanyPageDefaultArgs> = $Result.GetResult<Prisma.$CompanyPagePayload, S>

  type CompanyPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyPageCountAggregateInputType | true
    }

  export interface CompanyPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyPage'], meta: { name: 'CompanyPage' } }
    /**
     * Find zero or one CompanyPage that matches the filter.
     * @param {CompanyPageFindUniqueArgs} args - Arguments to find a CompanyPage
     * @example
     * // Get one CompanyPage
     * const companyPage = await prisma.companyPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyPageFindUniqueArgs>(args: SelectSubset<T, CompanyPageFindUniqueArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyPageFindUniqueOrThrowArgs} args - Arguments to find a CompanyPage
     * @example
     * // Get one CompanyPage
     * const companyPage = await prisma.companyPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyPageFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageFindFirstArgs} args - Arguments to find a CompanyPage
     * @example
     * // Get one CompanyPage
     * const companyPage = await prisma.companyPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyPageFindFirstArgs>(args?: SelectSubset<T, CompanyPageFindFirstArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageFindFirstOrThrowArgs} args - Arguments to find a CompanyPage
     * @example
     * // Get one CompanyPage
     * const companyPage = await prisma.companyPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyPageFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyPages
     * const companyPages = await prisma.companyPage.findMany()
     * 
     * // Get first 10 CompanyPages
     * const companyPages = await prisma.companyPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyPageWithIdOnly = await prisma.companyPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyPageFindManyArgs>(args?: SelectSubset<T, CompanyPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyPage.
     * @param {CompanyPageCreateArgs} args - Arguments to create a CompanyPage.
     * @example
     * // Create one CompanyPage
     * const CompanyPage = await prisma.companyPage.create({
     *   data: {
     *     // ... data to create a CompanyPage
     *   }
     * })
     * 
     */
    create<T extends CompanyPageCreateArgs>(args: SelectSubset<T, CompanyPageCreateArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyPages.
     * @param {CompanyPageCreateManyArgs} args - Arguments to create many CompanyPages.
     * @example
     * // Create many CompanyPages
     * const companyPage = await prisma.companyPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyPageCreateManyArgs>(args?: SelectSubset<T, CompanyPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyPages and returns the data saved in the database.
     * @param {CompanyPageCreateManyAndReturnArgs} args - Arguments to create many CompanyPages.
     * @example
     * // Create many CompanyPages
     * const companyPage = await prisma.companyPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyPages and only return the `id`
     * const companyPageWithIdOnly = await prisma.companyPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyPageCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyPage.
     * @param {CompanyPageDeleteArgs} args - Arguments to delete one CompanyPage.
     * @example
     * // Delete one CompanyPage
     * const CompanyPage = await prisma.companyPage.delete({
     *   where: {
     *     // ... filter to delete one CompanyPage
     *   }
     * })
     * 
     */
    delete<T extends CompanyPageDeleteArgs>(args: SelectSubset<T, CompanyPageDeleteArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyPage.
     * @param {CompanyPageUpdateArgs} args - Arguments to update one CompanyPage.
     * @example
     * // Update one CompanyPage
     * const companyPage = await prisma.companyPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyPageUpdateArgs>(args: SelectSubset<T, CompanyPageUpdateArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyPages.
     * @param {CompanyPageDeleteManyArgs} args - Arguments to filter CompanyPages to delete.
     * @example
     * // Delete a few CompanyPages
     * const { count } = await prisma.companyPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyPageDeleteManyArgs>(args?: SelectSubset<T, CompanyPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyPages
     * const companyPage = await prisma.companyPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyPageUpdateManyArgs>(args: SelectSubset<T, CompanyPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyPages and returns the data updated in the database.
     * @param {CompanyPageUpdateManyAndReturnArgs} args - Arguments to update many CompanyPages.
     * @example
     * // Update many CompanyPages
     * const companyPage = await prisma.companyPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyPages and only return the `id`
     * const companyPageWithIdOnly = await prisma.companyPage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyPageUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyPageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyPage.
     * @param {CompanyPageUpsertArgs} args - Arguments to update or create a CompanyPage.
     * @example
     * // Update or create a CompanyPage
     * const companyPage = await prisma.companyPage.upsert({
     *   create: {
     *     // ... data to create a CompanyPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyPage we want to update
     *   }
     * })
     */
    upsert<T extends CompanyPageUpsertArgs>(args: SelectSubset<T, CompanyPageUpsertArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageCountArgs} args - Arguments to filter CompanyPages to count.
     * @example
     * // Count the number of CompanyPages
     * const count = await prisma.companyPage.count({
     *   where: {
     *     // ... the filter for the CompanyPages we want to count
     *   }
     * })
    **/
    count<T extends CompanyPageCountArgs>(
      args?: Subset<T, CompanyPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyPageAggregateArgs>(args: Subset<T, CompanyPageAggregateArgs>): Prisma.PrismaPromise<GetCompanyPageAggregateType<T>>

    /**
     * Group by CompanyPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyPageGroupByArgs['orderBy'] }
        : { orderBy?: CompanyPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyPage model
   */
  readonly fields: CompanyPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    testimonials<T extends CompanyPage$testimonialsArgs<ExtArgs> = {}>(args?: Subset<T, CompanyPage$testimonialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyPage model
   */
  interface CompanyPageFieldRefs {
    readonly id: FieldRef<"CompanyPage", 'String'>
    readonly companyId: FieldRef<"CompanyPage", 'String'>
    readonly slug: FieldRef<"CompanyPage", 'String'>
    readonly title: FieldRef<"CompanyPage", 'String'>
    readonly description: FieldRef<"CompanyPage", 'String'>
    readonly logo: FieldRef<"CompanyPage", 'String'>
    readonly coverImage: FieldRef<"CompanyPage", 'String'>
    readonly primaryColor: FieldRef<"CompanyPage", 'String'>
    readonly accentColor: FieldRef<"CompanyPage", 'String'>
    readonly whatsapp: FieldRef<"CompanyPage", 'String'>
    readonly instagram: FieldRef<"CompanyPage", 'String'>
    readonly facebook: FieldRef<"CompanyPage", 'String'>
    readonly address: FieldRef<"CompanyPage", 'String'>
    readonly showServices: FieldRef<"CompanyPage", 'Boolean'>
    readonly showTestimonials: FieldRef<"CompanyPage", 'Boolean'>
    readonly showAbout: FieldRef<"CompanyPage", 'Boolean'>
    readonly metaTitle: FieldRef<"CompanyPage", 'String'>
    readonly metaDescription: FieldRef<"CompanyPage", 'String'>
    readonly createdAt: FieldRef<"CompanyPage", 'DateTime'>
    readonly updatedAt: FieldRef<"CompanyPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompanyPage findUnique
   */
  export type CompanyPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * Filter, which CompanyPage to fetch.
     */
    where: CompanyPageWhereUniqueInput
  }

  /**
   * CompanyPage findUniqueOrThrow
   */
  export type CompanyPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * Filter, which CompanyPage to fetch.
     */
    where: CompanyPageWhereUniqueInput
  }

  /**
   * CompanyPage findFirst
   */
  export type CompanyPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * Filter, which CompanyPage to fetch.
     */
    where?: CompanyPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPages to fetch.
     */
    orderBy?: CompanyPageOrderByWithRelationInput | CompanyPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyPages.
     */
    cursor?: CompanyPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyPages.
     */
    distinct?: CompanyPageScalarFieldEnum | CompanyPageScalarFieldEnum[]
  }

  /**
   * CompanyPage findFirstOrThrow
   */
  export type CompanyPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * Filter, which CompanyPage to fetch.
     */
    where?: CompanyPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPages to fetch.
     */
    orderBy?: CompanyPageOrderByWithRelationInput | CompanyPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyPages.
     */
    cursor?: CompanyPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyPages.
     */
    distinct?: CompanyPageScalarFieldEnum | CompanyPageScalarFieldEnum[]
  }

  /**
   * CompanyPage findMany
   */
  export type CompanyPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * Filter, which CompanyPages to fetch.
     */
    where?: CompanyPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPages to fetch.
     */
    orderBy?: CompanyPageOrderByWithRelationInput | CompanyPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyPages.
     */
    cursor?: CompanyPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPages.
     */
    skip?: number
    distinct?: CompanyPageScalarFieldEnum | CompanyPageScalarFieldEnum[]
  }

  /**
   * CompanyPage create
   */
  export type CompanyPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyPage.
     */
    data: XOR<CompanyPageCreateInput, CompanyPageUncheckedCreateInput>
  }

  /**
   * CompanyPage createMany
   */
  export type CompanyPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyPages.
     */
    data: CompanyPageCreateManyInput | CompanyPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyPage createManyAndReturn
   */
  export type CompanyPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyPages.
     */
    data: CompanyPageCreateManyInput | CompanyPageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyPage update
   */
  export type CompanyPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyPage.
     */
    data: XOR<CompanyPageUpdateInput, CompanyPageUncheckedUpdateInput>
    /**
     * Choose, which CompanyPage to update.
     */
    where: CompanyPageWhereUniqueInput
  }

  /**
   * CompanyPage updateMany
   */
  export type CompanyPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyPages.
     */
    data: XOR<CompanyPageUpdateManyMutationInput, CompanyPageUncheckedUpdateManyInput>
    /**
     * Filter which CompanyPages to update
     */
    where?: CompanyPageWhereInput
    /**
     * Limit how many CompanyPages to update.
     */
    limit?: number
  }

  /**
   * CompanyPage updateManyAndReturn
   */
  export type CompanyPageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * The data used to update CompanyPages.
     */
    data: XOR<CompanyPageUpdateManyMutationInput, CompanyPageUncheckedUpdateManyInput>
    /**
     * Filter which CompanyPages to update
     */
    where?: CompanyPageWhereInput
    /**
     * Limit how many CompanyPages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyPage upsert
   */
  export type CompanyPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyPage to update in case it exists.
     */
    where: CompanyPageWhereUniqueInput
    /**
     * In case the CompanyPage found by the `where` argument doesn't exist, create a new CompanyPage with this data.
     */
    create: XOR<CompanyPageCreateInput, CompanyPageUncheckedCreateInput>
    /**
     * In case the CompanyPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyPageUpdateInput, CompanyPageUncheckedUpdateInput>
  }

  /**
   * CompanyPage delete
   */
  export type CompanyPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
    /**
     * Filter which CompanyPage to delete.
     */
    where: CompanyPageWhereUniqueInput
  }

  /**
   * CompanyPage deleteMany
   */
  export type CompanyPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyPages to delete
     */
    where?: CompanyPageWhereInput
    /**
     * Limit how many CompanyPages to delete.
     */
    limit?: number
  }

  /**
   * CompanyPage.testimonials
   */
  export type CompanyPage$testimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    where?: PageTestimonialWhereInput
    orderBy?: PageTestimonialOrderByWithRelationInput | PageTestimonialOrderByWithRelationInput[]
    cursor?: PageTestimonialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageTestimonialScalarFieldEnum | PageTestimonialScalarFieldEnum[]
  }

  /**
   * CompanyPage without action
   */
  export type CompanyPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyPage
     */
    select?: CompanyPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyPage
     */
    omit?: CompanyPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyPageInclude<ExtArgs> | null
  }


  /**
   * Model PageTestimonial
   */

  export type AggregatePageTestimonial = {
    _count: PageTestimonialCountAggregateOutputType | null
    _avg: PageTestimonialAvgAggregateOutputType | null
    _sum: PageTestimonialSumAggregateOutputType | null
    _min: PageTestimonialMinAggregateOutputType | null
    _max: PageTestimonialMaxAggregateOutputType | null
  }

  export type PageTestimonialAvgAggregateOutputType = {
    rating: number | null
    position: number | null
  }

  export type PageTestimonialSumAggregateOutputType = {
    rating: number | null
    position: number | null
  }

  export type PageTestimonialMinAggregateOutputType = {
    id: string | null
    companyPageId: string | null
    authorName: string | null
    authorAvatar: string | null
    rating: number | null
    text: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageTestimonialMaxAggregateOutputType = {
    id: string | null
    companyPageId: string | null
    authorName: string | null
    authorAvatar: string | null
    rating: number | null
    text: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageTestimonialCountAggregateOutputType = {
    id: number
    companyPageId: number
    authorName: number
    authorAvatar: number
    rating: number
    text: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PageTestimonialAvgAggregateInputType = {
    rating?: true
    position?: true
  }

  export type PageTestimonialSumAggregateInputType = {
    rating?: true
    position?: true
  }

  export type PageTestimonialMinAggregateInputType = {
    id?: true
    companyPageId?: true
    authorName?: true
    authorAvatar?: true
    rating?: true
    text?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageTestimonialMaxAggregateInputType = {
    id?: true
    companyPageId?: true
    authorName?: true
    authorAvatar?: true
    rating?: true
    text?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageTestimonialCountAggregateInputType = {
    id?: true
    companyPageId?: true
    authorName?: true
    authorAvatar?: true
    rating?: true
    text?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PageTestimonialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PageTestimonial to aggregate.
     */
    where?: PageTestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageTestimonials to fetch.
     */
    orderBy?: PageTestimonialOrderByWithRelationInput | PageTestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageTestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageTestimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageTestimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PageTestimonials
    **/
    _count?: true | PageTestimonialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageTestimonialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageTestimonialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageTestimonialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageTestimonialMaxAggregateInputType
  }

  export type GetPageTestimonialAggregateType<T extends PageTestimonialAggregateArgs> = {
        [P in keyof T & keyof AggregatePageTestimonial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePageTestimonial[P]>
      : GetScalarType<T[P], AggregatePageTestimonial[P]>
  }




  export type PageTestimonialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageTestimonialWhereInput
    orderBy?: PageTestimonialOrderByWithAggregationInput | PageTestimonialOrderByWithAggregationInput[]
    by: PageTestimonialScalarFieldEnum[] | PageTestimonialScalarFieldEnum
    having?: PageTestimonialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageTestimonialCountAggregateInputType | true
    _avg?: PageTestimonialAvgAggregateInputType
    _sum?: PageTestimonialSumAggregateInputType
    _min?: PageTestimonialMinAggregateInputType
    _max?: PageTestimonialMaxAggregateInputType
  }

  export type PageTestimonialGroupByOutputType = {
    id: string
    companyPageId: string
    authorName: string
    authorAvatar: string | null
    rating: number
    text: string
    position: number
    createdAt: Date
    updatedAt: Date
    _count: PageTestimonialCountAggregateOutputType | null
    _avg: PageTestimonialAvgAggregateOutputType | null
    _sum: PageTestimonialSumAggregateOutputType | null
    _min: PageTestimonialMinAggregateOutputType | null
    _max: PageTestimonialMaxAggregateOutputType | null
  }

  type GetPageTestimonialGroupByPayload<T extends PageTestimonialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageTestimonialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageTestimonialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageTestimonialGroupByOutputType[P]>
            : GetScalarType<T[P], PageTestimonialGroupByOutputType[P]>
        }
      >
    >


  export type PageTestimonialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyPageId?: boolean
    authorName?: boolean
    authorAvatar?: boolean
    rating?: boolean
    text?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyPage?: boolean | CompanyPageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageTestimonial"]>

  export type PageTestimonialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyPageId?: boolean
    authorName?: boolean
    authorAvatar?: boolean
    rating?: boolean
    text?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyPage?: boolean | CompanyPageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageTestimonial"]>

  export type PageTestimonialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyPageId?: boolean
    authorName?: boolean
    authorAvatar?: boolean
    rating?: boolean
    text?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyPage?: boolean | CompanyPageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageTestimonial"]>

  export type PageTestimonialSelectScalar = {
    id?: boolean
    companyPageId?: boolean
    authorName?: boolean
    authorAvatar?: boolean
    rating?: boolean
    text?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PageTestimonialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyPageId" | "authorName" | "authorAvatar" | "rating" | "text" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["pageTestimonial"]>
  export type PageTestimonialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companyPage?: boolean | CompanyPageDefaultArgs<ExtArgs>
  }
  export type PageTestimonialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companyPage?: boolean | CompanyPageDefaultArgs<ExtArgs>
  }
  export type PageTestimonialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companyPage?: boolean | CompanyPageDefaultArgs<ExtArgs>
  }

  export type $PageTestimonialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PageTestimonial"
    objects: {
      companyPage: Prisma.$CompanyPagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyPageId: string
      authorName: string
      authorAvatar: string | null
      rating: number
      text: string
      position: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pageTestimonial"]>
    composites: {}
  }

  type PageTestimonialGetPayload<S extends boolean | null | undefined | PageTestimonialDefaultArgs> = $Result.GetResult<Prisma.$PageTestimonialPayload, S>

  type PageTestimonialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageTestimonialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageTestimonialCountAggregateInputType | true
    }

  export interface PageTestimonialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PageTestimonial'], meta: { name: 'PageTestimonial' } }
    /**
     * Find zero or one PageTestimonial that matches the filter.
     * @param {PageTestimonialFindUniqueArgs} args - Arguments to find a PageTestimonial
     * @example
     * // Get one PageTestimonial
     * const pageTestimonial = await prisma.pageTestimonial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageTestimonialFindUniqueArgs>(args: SelectSubset<T, PageTestimonialFindUniqueArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PageTestimonial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageTestimonialFindUniqueOrThrowArgs} args - Arguments to find a PageTestimonial
     * @example
     * // Get one PageTestimonial
     * const pageTestimonial = await prisma.pageTestimonial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageTestimonialFindUniqueOrThrowArgs>(args: SelectSubset<T, PageTestimonialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PageTestimonial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialFindFirstArgs} args - Arguments to find a PageTestimonial
     * @example
     * // Get one PageTestimonial
     * const pageTestimonial = await prisma.pageTestimonial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageTestimonialFindFirstArgs>(args?: SelectSubset<T, PageTestimonialFindFirstArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PageTestimonial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialFindFirstOrThrowArgs} args - Arguments to find a PageTestimonial
     * @example
     * // Get one PageTestimonial
     * const pageTestimonial = await prisma.pageTestimonial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageTestimonialFindFirstOrThrowArgs>(args?: SelectSubset<T, PageTestimonialFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PageTestimonials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PageTestimonials
     * const pageTestimonials = await prisma.pageTestimonial.findMany()
     * 
     * // Get first 10 PageTestimonials
     * const pageTestimonials = await prisma.pageTestimonial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageTestimonialWithIdOnly = await prisma.pageTestimonial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageTestimonialFindManyArgs>(args?: SelectSubset<T, PageTestimonialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PageTestimonial.
     * @param {PageTestimonialCreateArgs} args - Arguments to create a PageTestimonial.
     * @example
     * // Create one PageTestimonial
     * const PageTestimonial = await prisma.pageTestimonial.create({
     *   data: {
     *     // ... data to create a PageTestimonial
     *   }
     * })
     * 
     */
    create<T extends PageTestimonialCreateArgs>(args: SelectSubset<T, PageTestimonialCreateArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PageTestimonials.
     * @param {PageTestimonialCreateManyArgs} args - Arguments to create many PageTestimonials.
     * @example
     * // Create many PageTestimonials
     * const pageTestimonial = await prisma.pageTestimonial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageTestimonialCreateManyArgs>(args?: SelectSubset<T, PageTestimonialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PageTestimonials and returns the data saved in the database.
     * @param {PageTestimonialCreateManyAndReturnArgs} args - Arguments to create many PageTestimonials.
     * @example
     * // Create many PageTestimonials
     * const pageTestimonial = await prisma.pageTestimonial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PageTestimonials and only return the `id`
     * const pageTestimonialWithIdOnly = await prisma.pageTestimonial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageTestimonialCreateManyAndReturnArgs>(args?: SelectSubset<T, PageTestimonialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PageTestimonial.
     * @param {PageTestimonialDeleteArgs} args - Arguments to delete one PageTestimonial.
     * @example
     * // Delete one PageTestimonial
     * const PageTestimonial = await prisma.pageTestimonial.delete({
     *   where: {
     *     // ... filter to delete one PageTestimonial
     *   }
     * })
     * 
     */
    delete<T extends PageTestimonialDeleteArgs>(args: SelectSubset<T, PageTestimonialDeleteArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PageTestimonial.
     * @param {PageTestimonialUpdateArgs} args - Arguments to update one PageTestimonial.
     * @example
     * // Update one PageTestimonial
     * const pageTestimonial = await prisma.pageTestimonial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageTestimonialUpdateArgs>(args: SelectSubset<T, PageTestimonialUpdateArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PageTestimonials.
     * @param {PageTestimonialDeleteManyArgs} args - Arguments to filter PageTestimonials to delete.
     * @example
     * // Delete a few PageTestimonials
     * const { count } = await prisma.pageTestimonial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageTestimonialDeleteManyArgs>(args?: SelectSubset<T, PageTestimonialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageTestimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PageTestimonials
     * const pageTestimonial = await prisma.pageTestimonial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageTestimonialUpdateManyArgs>(args: SelectSubset<T, PageTestimonialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageTestimonials and returns the data updated in the database.
     * @param {PageTestimonialUpdateManyAndReturnArgs} args - Arguments to update many PageTestimonials.
     * @example
     * // Update many PageTestimonials
     * const pageTestimonial = await prisma.pageTestimonial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PageTestimonials and only return the `id`
     * const pageTestimonialWithIdOnly = await prisma.pageTestimonial.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageTestimonialUpdateManyAndReturnArgs>(args: SelectSubset<T, PageTestimonialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PageTestimonial.
     * @param {PageTestimonialUpsertArgs} args - Arguments to update or create a PageTestimonial.
     * @example
     * // Update or create a PageTestimonial
     * const pageTestimonial = await prisma.pageTestimonial.upsert({
     *   create: {
     *     // ... data to create a PageTestimonial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PageTestimonial we want to update
     *   }
     * })
     */
    upsert<T extends PageTestimonialUpsertArgs>(args: SelectSubset<T, PageTestimonialUpsertArgs<ExtArgs>>): Prisma__PageTestimonialClient<$Result.GetResult<Prisma.$PageTestimonialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PageTestimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialCountArgs} args - Arguments to filter PageTestimonials to count.
     * @example
     * // Count the number of PageTestimonials
     * const count = await prisma.pageTestimonial.count({
     *   where: {
     *     // ... the filter for the PageTestimonials we want to count
     *   }
     * })
    **/
    count<T extends PageTestimonialCountArgs>(
      args?: Subset<T, PageTestimonialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageTestimonialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PageTestimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageTestimonialAggregateArgs>(args: Subset<T, PageTestimonialAggregateArgs>): Prisma.PrismaPromise<GetPageTestimonialAggregateType<T>>

    /**
     * Group by PageTestimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageTestimonialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageTestimonialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageTestimonialGroupByArgs['orderBy'] }
        : { orderBy?: PageTestimonialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageTestimonialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageTestimonialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PageTestimonial model
   */
  readonly fields: PageTestimonialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PageTestimonial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageTestimonialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companyPage<T extends CompanyPageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyPageDefaultArgs<ExtArgs>>): Prisma__CompanyPageClient<$Result.GetResult<Prisma.$CompanyPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PageTestimonial model
   */
  interface PageTestimonialFieldRefs {
    readonly id: FieldRef<"PageTestimonial", 'String'>
    readonly companyPageId: FieldRef<"PageTestimonial", 'String'>
    readonly authorName: FieldRef<"PageTestimonial", 'String'>
    readonly authorAvatar: FieldRef<"PageTestimonial", 'String'>
    readonly rating: FieldRef<"PageTestimonial", 'Int'>
    readonly text: FieldRef<"PageTestimonial", 'String'>
    readonly position: FieldRef<"PageTestimonial", 'Int'>
    readonly createdAt: FieldRef<"PageTestimonial", 'DateTime'>
    readonly updatedAt: FieldRef<"PageTestimonial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PageTestimonial findUnique
   */
  export type PageTestimonialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * Filter, which PageTestimonial to fetch.
     */
    where: PageTestimonialWhereUniqueInput
  }

  /**
   * PageTestimonial findUniqueOrThrow
   */
  export type PageTestimonialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * Filter, which PageTestimonial to fetch.
     */
    where: PageTestimonialWhereUniqueInput
  }

  /**
   * PageTestimonial findFirst
   */
  export type PageTestimonialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * Filter, which PageTestimonial to fetch.
     */
    where?: PageTestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageTestimonials to fetch.
     */
    orderBy?: PageTestimonialOrderByWithRelationInput | PageTestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageTestimonials.
     */
    cursor?: PageTestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageTestimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageTestimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageTestimonials.
     */
    distinct?: PageTestimonialScalarFieldEnum | PageTestimonialScalarFieldEnum[]
  }

  /**
   * PageTestimonial findFirstOrThrow
   */
  export type PageTestimonialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * Filter, which PageTestimonial to fetch.
     */
    where?: PageTestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageTestimonials to fetch.
     */
    orderBy?: PageTestimonialOrderByWithRelationInput | PageTestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageTestimonials.
     */
    cursor?: PageTestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageTestimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageTestimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageTestimonials.
     */
    distinct?: PageTestimonialScalarFieldEnum | PageTestimonialScalarFieldEnum[]
  }

  /**
   * PageTestimonial findMany
   */
  export type PageTestimonialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * Filter, which PageTestimonials to fetch.
     */
    where?: PageTestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageTestimonials to fetch.
     */
    orderBy?: PageTestimonialOrderByWithRelationInput | PageTestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PageTestimonials.
     */
    cursor?: PageTestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageTestimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageTestimonials.
     */
    skip?: number
    distinct?: PageTestimonialScalarFieldEnum | PageTestimonialScalarFieldEnum[]
  }

  /**
   * PageTestimonial create
   */
  export type PageTestimonialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * The data needed to create a PageTestimonial.
     */
    data: XOR<PageTestimonialCreateInput, PageTestimonialUncheckedCreateInput>
  }

  /**
   * PageTestimonial createMany
   */
  export type PageTestimonialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PageTestimonials.
     */
    data: PageTestimonialCreateManyInput | PageTestimonialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PageTestimonial createManyAndReturn
   */
  export type PageTestimonialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * The data used to create many PageTestimonials.
     */
    data: PageTestimonialCreateManyInput | PageTestimonialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PageTestimonial update
   */
  export type PageTestimonialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * The data needed to update a PageTestimonial.
     */
    data: XOR<PageTestimonialUpdateInput, PageTestimonialUncheckedUpdateInput>
    /**
     * Choose, which PageTestimonial to update.
     */
    where: PageTestimonialWhereUniqueInput
  }

  /**
   * PageTestimonial updateMany
   */
  export type PageTestimonialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PageTestimonials.
     */
    data: XOR<PageTestimonialUpdateManyMutationInput, PageTestimonialUncheckedUpdateManyInput>
    /**
     * Filter which PageTestimonials to update
     */
    where?: PageTestimonialWhereInput
    /**
     * Limit how many PageTestimonials to update.
     */
    limit?: number
  }

  /**
   * PageTestimonial updateManyAndReturn
   */
  export type PageTestimonialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * The data used to update PageTestimonials.
     */
    data: XOR<PageTestimonialUpdateManyMutationInput, PageTestimonialUncheckedUpdateManyInput>
    /**
     * Filter which PageTestimonials to update
     */
    where?: PageTestimonialWhereInput
    /**
     * Limit how many PageTestimonials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PageTestimonial upsert
   */
  export type PageTestimonialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * The filter to search for the PageTestimonial to update in case it exists.
     */
    where: PageTestimonialWhereUniqueInput
    /**
     * In case the PageTestimonial found by the `where` argument doesn't exist, create a new PageTestimonial with this data.
     */
    create: XOR<PageTestimonialCreateInput, PageTestimonialUncheckedCreateInput>
    /**
     * In case the PageTestimonial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageTestimonialUpdateInput, PageTestimonialUncheckedUpdateInput>
  }

  /**
   * PageTestimonial delete
   */
  export type PageTestimonialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
    /**
     * Filter which PageTestimonial to delete.
     */
    where: PageTestimonialWhereUniqueInput
  }

  /**
   * PageTestimonial deleteMany
   */
  export type PageTestimonialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PageTestimonials to delete
     */
    where?: PageTestimonialWhereInput
    /**
     * Limit how many PageTestimonials to delete.
     */
    limit?: number
  }

  /**
   * PageTestimonial without action
   */
  export type PageTestimonialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageTestimonial
     */
    select?: PageTestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageTestimonial
     */
    omit?: PageTestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageTestimonialInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    plan: $Enums.SubscriptionPlan | null
    status: $Enums.SubscriptionStatus | null
    mpSubscriptionId: string | null
    mpPreapprovalPlanId: string | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    canceledAt: Date | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    plan: $Enums.SubscriptionPlan | null
    status: $Enums.SubscriptionStatus | null
    mpSubscriptionId: string | null
    mpPreapprovalPlanId: string | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    canceledAt: Date | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    companyId: number
    plan: number
    status: number
    mpSubscriptionId: number
    mpPreapprovalPlanId: number
    currentPeriodStart: number
    currentPeriodEnd: number
    cancelAtPeriodEnd: number
    canceledAt: number
    trialEndsAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    companyId?: true
    plan?: true
    status?: true
    mpSubscriptionId?: true
    mpPreapprovalPlanId?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    canceledAt?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    companyId?: true
    plan?: true
    status?: true
    mpSubscriptionId?: true
    mpPreapprovalPlanId?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    canceledAt?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    companyId?: true
    plan?: true
    status?: true
    mpSubscriptionId?: true
    mpPreapprovalPlanId?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    canceledAt?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    companyId: string
    plan: $Enums.SubscriptionPlan
    status: $Enums.SubscriptionStatus
    mpSubscriptionId: string | null
    mpPreapprovalPlanId: string | null
    currentPeriodStart: Date
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean
    canceledAt: Date | null
    trialEndsAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    plan?: boolean
    status?: boolean
    mpSubscriptionId?: boolean
    mpPreapprovalPlanId?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    payments?: boolean | Subscription$paymentsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    plan?: boolean
    status?: boolean
    mpSubscriptionId?: boolean
    mpPreapprovalPlanId?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    plan?: boolean
    status?: boolean
    mpSubscriptionId?: boolean
    mpPreapprovalPlanId?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    companyId?: boolean
    plan?: boolean
    status?: boolean
    mpSubscriptionId?: boolean
    mpPreapprovalPlanId?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "plan" | "status" | "mpSubscriptionId" | "mpPreapprovalPlanId" | "currentPeriodStart" | "currentPeriodEnd" | "cancelAtPeriodEnd" | "canceledAt" | "trialEndsAt" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    payments?: boolean | Subscription$paymentsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      plan: $Enums.SubscriptionPlan
      status: $Enums.SubscriptionStatus
      mpSubscriptionId: string | null
      mpPreapprovalPlanId: string | null
      currentPeriodStart: Date
      currentPeriodEnd: Date | null
      cancelAtPeriodEnd: boolean
      canceledAt: Date | null
      trialEndsAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payments<T extends Subscription$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly companyId: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'SubscriptionPlan'>
    readonly status: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly mpSubscriptionId: FieldRef<"Subscription", 'String'>
    readonly mpPreapprovalPlanId: FieldRef<"Subscription", 'String'>
    readonly currentPeriodStart: FieldRef<"Subscription", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly cancelAtPeriodEnd: FieldRef<"Subscription", 'Boolean'>
    readonly canceledAt: FieldRef<"Subscription", 'DateTime'>
    readonly trialEndsAt: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription.payments
   */
  export type Subscription$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    mpPaymentId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    paymentMethod: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    mpPaymentId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    paymentMethod: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    subscriptionId: number
    mpPaymentId: number
    amount: number
    currency: number
    status: number
    paymentMethod: number
    paidAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    subscriptionId?: true
    mpPaymentId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    subscriptionId?: true
    mpPaymentId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    subscriptionId?: true
    mpPaymentId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    subscriptionId: string
    mpPaymentId: string
    amount: number
    currency: string
    status: $Enums.PaymentStatus
    paymentMethod: string | null
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    mpPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    mpPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    mpPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    subscriptionId?: boolean
    mpPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subscriptionId" | "mpPaymentId" | "amount" | "currency" | "status" | "paymentMethod" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      subscription: Prisma.$SubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subscriptionId: string
      mpPaymentId: string
      amount: number
      currency: string
      status: $Enums.PaymentStatus
      paymentMethod: string | null
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends SubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionDefaultArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly subscriptionId: FieldRef<"Payment", 'String'>
    readonly mpPaymentId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LeadScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    interest: 'interest',
    ip: 'ip',
    createdAt: 'createdAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const RateLimitScalarFieldEnum: {
    id: 'id',
    ip: 'ip',
    count: 'count',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RateLimitScalarFieldEnum = (typeof RateLimitScalarFieldEnum)[keyof typeof RateLimitScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    nomeFantasia: 'nomeFantasia',
    razaoSocial: 'razaoSocial',
    cnpjCpf: 'cnpjCpf',
    endereco: 'endereco',
    telefone: 'telefone',
    email: 'email',
    contrato: 'contrato',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const WorkingHoursScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    dayOfWeek: 'dayOfWeek',
    openTime: 'openTime',
    closeTime: 'closeTime'
  };

  export type WorkingHoursScalarFieldEnum = (typeof WorkingHoursScalarFieldEnum)[keyof typeof WorkingHoursScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    price: 'price',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ProfessionalServiceScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    serviceId: 'serviceId'
  };

  export type ProfessionalServiceScalarFieldEnum = (typeof ProfessionalServiceScalarFieldEnum)[keyof typeof ProfessionalServiceScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    companyId: 'companyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    professionalId: 'professionalId',
    clientName: 'clientName',
    clientId: 'clientId',
    serviceId: 'serviceId',
    price: 'price',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    email: 'email',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const CompanyPageScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    slug: 'slug',
    title: 'title',
    description: 'description',
    logo: 'logo',
    coverImage: 'coverImage',
    primaryColor: 'primaryColor',
    accentColor: 'accentColor',
    whatsapp: 'whatsapp',
    instagram: 'instagram',
    facebook: 'facebook',
    address: 'address',
    showServices: 'showServices',
    showTestimonials: 'showTestimonials',
    showAbout: 'showAbout',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyPageScalarFieldEnum = (typeof CompanyPageScalarFieldEnum)[keyof typeof CompanyPageScalarFieldEnum]


  export const PageTestimonialScalarFieldEnum: {
    id: 'id',
    companyPageId: 'companyPageId',
    authorName: 'authorName',
    authorAvatar: 'authorAvatar',
    rating: 'rating',
    text: 'text',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PageTestimonialScalarFieldEnum = (typeof PageTestimonialScalarFieldEnum)[keyof typeof PageTestimonialScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    plan: 'plan',
    status: 'status',
    mpSubscriptionId: 'mpSubscriptionId',
    mpPreapprovalPlanId: 'mpPreapprovalPlanId',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    canceledAt: 'canceledAt',
    trialEndsAt: 'trialEndsAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    subscriptionId: 'subscriptionId',
    mpPaymentId: 'mpPaymentId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    paymentMethod: 'paymentMethod',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Interest'
   */
  export type EnumInterestFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Interest'>
    


  /**
   * Reference to a field of type 'Interest[]'
   */
  export type ListEnumInterestFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Interest[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ContractType'
   */
  export type EnumContractTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractType'>
    


  /**
   * Reference to a field of type 'ContractType[]'
   */
  export type ListEnumContractTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'SubscriptionPlan'
   */
  export type EnumSubscriptionPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionPlan'>
    


  /**
   * Reference to a field of type 'SubscriptionPlan[]'
   */
  export type ListEnumSubscriptionPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionPlan[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: IntFilter<"Lead"> | number
    name?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    interest?: EnumInterestFilter<"Lead"> | $Enums.Interest
    ip?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    interest?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    name?: StringFilter<"Lead"> | string
    interest?: EnumInterestFilter<"Lead"> | $Enums.Interest
    ip?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
  }, "id" | "email">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    interest?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lead"> | number
    name?: StringWithAggregatesFilter<"Lead"> | string
    email?: StringWithAggregatesFilter<"Lead"> | string
    interest?: EnumInterestWithAggregatesFilter<"Lead"> | $Enums.Interest
    ip?: StringWithAggregatesFilter<"Lead"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type RateLimitWhereInput = {
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    id?: IntFilter<"RateLimit"> | number
    ip?: StringFilter<"RateLimit"> | string
    count?: IntFilter<"RateLimit"> | number
    expiresAt?: DateTimeFilter<"RateLimit"> | Date | string
    createdAt?: DateTimeFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RateLimit"> | Date | string
  }

  export type RateLimitOrderByWithRelationInput = {
    id?: SortOrder
    ip?: SortOrder
    count?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    ip?: StringFilter<"RateLimit"> | string
    count?: IntFilter<"RateLimit"> | number
    expiresAt?: DateTimeFilter<"RateLimit"> | Date | string
    createdAt?: DateTimeFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RateLimit"> | Date | string
  }, "id">

  export type RateLimitOrderByWithAggregationInput = {
    id?: SortOrder
    ip?: SortOrder
    count?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RateLimitCountOrderByAggregateInput
    _avg?: RateLimitAvgOrderByAggregateInput
    _max?: RateLimitMaxOrderByAggregateInput
    _min?: RateLimitMinOrderByAggregateInput
    _sum?: RateLimitSumOrderByAggregateInput
  }

  export type RateLimitScalarWhereWithAggregatesInput = {
    AND?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    OR?: RateLimitScalarWhereWithAggregatesInput[]
    NOT?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RateLimit"> | number
    ip?: StringWithAggregatesFilter<"RateLimit"> | string
    count?: IntWithAggregatesFilter<"RateLimit"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    nomeFantasia?: StringFilter<"Company"> | string
    razaoSocial?: StringNullableFilter<"Company"> | string | null
    cnpjCpf?: StringFilter<"Company"> | string
    endereco?: StringNullableFilter<"Company"> | string | null
    telefone?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    contrato?: EnumContractTypeFilter<"Company"> | $Enums.ContractType
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    appointments?: AppointmentListRelationFilter
    clients?: ClientListRelationFilter
    workingHours?: WorkingHoursListRelationFilter
    services?: ServiceListRelationFilter
    companyPage?: XOR<CompanyPageNullableScalarRelationFilter, CompanyPageWhereInput> | null
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrderInput | SortOrder
    cnpjCpf?: SortOrder
    endereco?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    contrato?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    clients?: ClientOrderByRelationAggregateInput
    workingHours?: WorkingHoursOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    companyPage?: CompanyPageOrderByWithRelationInput
    subscription?: SubscriptionOrderByWithRelationInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpjCpf?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    nomeFantasia?: StringFilter<"Company"> | string
    razaoSocial?: StringNullableFilter<"Company"> | string | null
    endereco?: StringNullableFilter<"Company"> | string | null
    telefone?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    contrato?: EnumContractTypeFilter<"Company"> | $Enums.ContractType
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    appointments?: AppointmentListRelationFilter
    clients?: ClientListRelationFilter
    workingHours?: WorkingHoursListRelationFilter
    services?: ServiceListRelationFilter
    companyPage?: XOR<CompanyPageNullableScalarRelationFilter, CompanyPageWhereInput> | null
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
  }, "id" | "cnpjCpf">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrderInput | SortOrder
    cnpjCpf?: SortOrder
    endereco?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    contrato?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    nomeFantasia?: StringWithAggregatesFilter<"Company"> | string
    razaoSocial?: StringNullableWithAggregatesFilter<"Company"> | string | null
    cnpjCpf?: StringWithAggregatesFilter<"Company"> | string
    endereco?: StringNullableWithAggregatesFilter<"Company"> | string | null
    telefone?: StringNullableWithAggregatesFilter<"Company"> | string | null
    email?: StringNullableWithAggregatesFilter<"Company"> | string | null
    contrato?: EnumContractTypeWithAggregatesFilter<"Company"> | $Enums.ContractType
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type WorkingHoursWhereInput = {
    AND?: WorkingHoursWhereInput | WorkingHoursWhereInput[]
    OR?: WorkingHoursWhereInput[]
    NOT?: WorkingHoursWhereInput | WorkingHoursWhereInput[]
    id?: StringFilter<"WorkingHours"> | string
    companyId?: StringFilter<"WorkingHours"> | string
    dayOfWeek?: IntFilter<"WorkingHours"> | number
    openTime?: StringFilter<"WorkingHours"> | string
    closeTime?: StringFilter<"WorkingHours"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type WorkingHoursOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type WorkingHoursWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkingHoursWhereInput | WorkingHoursWhereInput[]
    OR?: WorkingHoursWhereInput[]
    NOT?: WorkingHoursWhereInput | WorkingHoursWhereInput[]
    companyId?: StringFilter<"WorkingHours"> | string
    dayOfWeek?: IntFilter<"WorkingHours"> | number
    openTime?: StringFilter<"WorkingHours"> | string
    closeTime?: StringFilter<"WorkingHours"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type WorkingHoursOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    _count?: WorkingHoursCountOrderByAggregateInput
    _avg?: WorkingHoursAvgOrderByAggregateInput
    _max?: WorkingHoursMaxOrderByAggregateInput
    _min?: WorkingHoursMinOrderByAggregateInput
    _sum?: WorkingHoursSumOrderByAggregateInput
  }

  export type WorkingHoursScalarWhereWithAggregatesInput = {
    AND?: WorkingHoursScalarWhereWithAggregatesInput | WorkingHoursScalarWhereWithAggregatesInput[]
    OR?: WorkingHoursScalarWhereWithAggregatesInput[]
    NOT?: WorkingHoursScalarWhereWithAggregatesInput | WorkingHoursScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkingHours"> | string
    companyId?: StringWithAggregatesFilter<"WorkingHours"> | string
    dayOfWeek?: IntWithAggregatesFilter<"WorkingHours"> | number
    openTime?: StringWithAggregatesFilter<"WorkingHours"> | string
    closeTime?: StringWithAggregatesFilter<"WorkingHours"> | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    companyId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    price?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    appointments?: AppointmentListRelationFilter
    professionals?: ProfessionalServiceListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    professionals?: ProfessionalServiceOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    companyId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    price?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    appointments?: AppointmentListRelationFilter
    professionals?: ProfessionalServiceListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    companyId?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    price?: FloatWithAggregatesFilter<"Service"> | number
    duration?: IntWithAggregatesFilter<"Service"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type ProfessionalServiceWhereInput = {
    AND?: ProfessionalServiceWhereInput | ProfessionalServiceWhereInput[]
    OR?: ProfessionalServiceWhereInput[]
    NOT?: ProfessionalServiceWhereInput | ProfessionalServiceWhereInput[]
    id?: StringFilter<"ProfessionalService"> | string
    professionalId?: StringFilter<"ProfessionalService"> | string
    serviceId?: StringFilter<"ProfessionalService"> | string
    professional?: XOR<UserScalarRelationFilter, UserWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ProfessionalServiceOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
    professional?: UserOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type ProfessionalServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    professionalId_serviceId?: ProfessionalServiceProfessionalIdServiceIdCompoundUniqueInput
    AND?: ProfessionalServiceWhereInput | ProfessionalServiceWhereInput[]
    OR?: ProfessionalServiceWhereInput[]
    NOT?: ProfessionalServiceWhereInput | ProfessionalServiceWhereInput[]
    professionalId?: StringFilter<"ProfessionalService"> | string
    serviceId?: StringFilter<"ProfessionalService"> | string
    professional?: XOR<UserScalarRelationFilter, UserWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id" | "professionalId_serviceId">

  export type ProfessionalServiceOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
    _count?: ProfessionalServiceCountOrderByAggregateInput
    _max?: ProfessionalServiceMaxOrderByAggregateInput
    _min?: ProfessionalServiceMinOrderByAggregateInput
  }

  export type ProfessionalServiceScalarWhereWithAggregatesInput = {
    AND?: ProfessionalServiceScalarWhereWithAggregatesInput | ProfessionalServiceScalarWhereWithAggregatesInput[]
    OR?: ProfessionalServiceScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalServiceScalarWhereWithAggregatesInput | ProfessionalServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalService"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalService"> | string
    serviceId?: StringWithAggregatesFilter<"ProfessionalService"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    companyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    appointments?: AppointmentListRelationFilter
    services?: ProfessionalServiceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    services?: ProfessionalServiceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    companyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    appointments?: AppointmentListRelationFilter
    services?: ProfessionalServiceListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    companyId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    companyId?: StringFilter<"Appointment"> | string
    professionalId?: StringFilter<"Appointment"> | string
    clientName?: StringFilter<"Appointment"> | string
    clientId?: StringNullableFilter<"Appointment"> | string | null
    serviceId?: StringFilter<"Appointment"> | string
    price?: FloatNullableFilter<"Appointment"> | number | null
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    professional?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    professionalId?: SortOrder
    clientName?: SortOrder
    clientId?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    price?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    professional?: UserOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    companyId?: StringFilter<"Appointment"> | string
    professionalId?: StringFilter<"Appointment"> | string
    clientName?: StringFilter<"Appointment"> | string
    clientId?: StringNullableFilter<"Appointment"> | string | null
    serviceId?: StringFilter<"Appointment"> | string
    price?: FloatNullableFilter<"Appointment"> | number | null
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    professional?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    professionalId?: SortOrder
    clientName?: SortOrder
    clientId?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    price?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    companyId?: StringWithAggregatesFilter<"Appointment"> | string
    professionalId?: StringWithAggregatesFilter<"Appointment"> | string
    clientName?: StringWithAggregatesFilter<"Appointment"> | string
    clientId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    serviceId?: StringWithAggregatesFilter<"Appointment"> | string
    price?: FloatNullableWithAggregatesFilter<"Appointment"> | number | null
    startTime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    companyId?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    appointments?: AppointmentListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    companyId?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    appointments?: AppointmentListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    companyId?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type CompanyPageWhereInput = {
    AND?: CompanyPageWhereInput | CompanyPageWhereInput[]
    OR?: CompanyPageWhereInput[]
    NOT?: CompanyPageWhereInput | CompanyPageWhereInput[]
    id?: StringFilter<"CompanyPage"> | string
    companyId?: StringFilter<"CompanyPage"> | string
    slug?: StringFilter<"CompanyPage"> | string
    title?: StringFilter<"CompanyPage"> | string
    description?: StringNullableFilter<"CompanyPage"> | string | null
    logo?: StringNullableFilter<"CompanyPage"> | string | null
    coverImage?: StringNullableFilter<"CompanyPage"> | string | null
    primaryColor?: StringFilter<"CompanyPage"> | string
    accentColor?: StringFilter<"CompanyPage"> | string
    whatsapp?: StringNullableFilter<"CompanyPage"> | string | null
    instagram?: StringNullableFilter<"CompanyPage"> | string | null
    facebook?: StringNullableFilter<"CompanyPage"> | string | null
    address?: StringNullableFilter<"CompanyPage"> | string | null
    showServices?: BoolFilter<"CompanyPage"> | boolean
    showTestimonials?: BoolFilter<"CompanyPage"> | boolean
    showAbout?: BoolFilter<"CompanyPage"> | boolean
    metaTitle?: StringNullableFilter<"CompanyPage"> | string | null
    metaDescription?: StringNullableFilter<"CompanyPage"> | string | null
    createdAt?: DateTimeFilter<"CompanyPage"> | Date | string
    updatedAt?: DateTimeFilter<"CompanyPage"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    testimonials?: PageTestimonialListRelationFilter
  }

  export type CompanyPageOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    primaryColor?: SortOrder
    accentColor?: SortOrder
    whatsapp?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    showServices?: SortOrder
    showTestimonials?: SortOrder
    showAbout?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    testimonials?: PageTestimonialOrderByRelationAggregateInput
  }

  export type CompanyPageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId?: string
    slug?: string
    AND?: CompanyPageWhereInput | CompanyPageWhereInput[]
    OR?: CompanyPageWhereInput[]
    NOT?: CompanyPageWhereInput | CompanyPageWhereInput[]
    title?: StringFilter<"CompanyPage"> | string
    description?: StringNullableFilter<"CompanyPage"> | string | null
    logo?: StringNullableFilter<"CompanyPage"> | string | null
    coverImage?: StringNullableFilter<"CompanyPage"> | string | null
    primaryColor?: StringFilter<"CompanyPage"> | string
    accentColor?: StringFilter<"CompanyPage"> | string
    whatsapp?: StringNullableFilter<"CompanyPage"> | string | null
    instagram?: StringNullableFilter<"CompanyPage"> | string | null
    facebook?: StringNullableFilter<"CompanyPage"> | string | null
    address?: StringNullableFilter<"CompanyPage"> | string | null
    showServices?: BoolFilter<"CompanyPage"> | boolean
    showTestimonials?: BoolFilter<"CompanyPage"> | boolean
    showAbout?: BoolFilter<"CompanyPage"> | boolean
    metaTitle?: StringNullableFilter<"CompanyPage"> | string | null
    metaDescription?: StringNullableFilter<"CompanyPage"> | string | null
    createdAt?: DateTimeFilter<"CompanyPage"> | Date | string
    updatedAt?: DateTimeFilter<"CompanyPage"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    testimonials?: PageTestimonialListRelationFilter
  }, "id" | "companyId" | "slug">

  export type CompanyPageOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    primaryColor?: SortOrder
    accentColor?: SortOrder
    whatsapp?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    showServices?: SortOrder
    showTestimonials?: SortOrder
    showAbout?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyPageCountOrderByAggregateInput
    _max?: CompanyPageMaxOrderByAggregateInput
    _min?: CompanyPageMinOrderByAggregateInput
  }

  export type CompanyPageScalarWhereWithAggregatesInput = {
    AND?: CompanyPageScalarWhereWithAggregatesInput | CompanyPageScalarWhereWithAggregatesInput[]
    OR?: CompanyPageScalarWhereWithAggregatesInput[]
    NOT?: CompanyPageScalarWhereWithAggregatesInput | CompanyPageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanyPage"> | string
    companyId?: StringWithAggregatesFilter<"CompanyPage"> | string
    slug?: StringWithAggregatesFilter<"CompanyPage"> | string
    title?: StringWithAggregatesFilter<"CompanyPage"> | string
    description?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    logo?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    primaryColor?: StringWithAggregatesFilter<"CompanyPage"> | string
    accentColor?: StringWithAggregatesFilter<"CompanyPage"> | string
    whatsapp?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    facebook?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    address?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    showServices?: BoolWithAggregatesFilter<"CompanyPage"> | boolean
    showTestimonials?: BoolWithAggregatesFilter<"CompanyPage"> | boolean
    showAbout?: BoolWithAggregatesFilter<"CompanyPage"> | boolean
    metaTitle?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"CompanyPage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CompanyPage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CompanyPage"> | Date | string
  }

  export type PageTestimonialWhereInput = {
    AND?: PageTestimonialWhereInput | PageTestimonialWhereInput[]
    OR?: PageTestimonialWhereInput[]
    NOT?: PageTestimonialWhereInput | PageTestimonialWhereInput[]
    id?: StringFilter<"PageTestimonial"> | string
    companyPageId?: StringFilter<"PageTestimonial"> | string
    authorName?: StringFilter<"PageTestimonial"> | string
    authorAvatar?: StringNullableFilter<"PageTestimonial"> | string | null
    rating?: IntFilter<"PageTestimonial"> | number
    text?: StringFilter<"PageTestimonial"> | string
    position?: IntFilter<"PageTestimonial"> | number
    createdAt?: DateTimeFilter<"PageTestimonial"> | Date | string
    updatedAt?: DateTimeFilter<"PageTestimonial"> | Date | string
    companyPage?: XOR<CompanyPageScalarRelationFilter, CompanyPageWhereInput>
  }

  export type PageTestimonialOrderByWithRelationInput = {
    id?: SortOrder
    companyPageId?: SortOrder
    authorName?: SortOrder
    authorAvatar?: SortOrderInput | SortOrder
    rating?: SortOrder
    text?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyPage?: CompanyPageOrderByWithRelationInput
  }

  export type PageTestimonialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PageTestimonialWhereInput | PageTestimonialWhereInput[]
    OR?: PageTestimonialWhereInput[]
    NOT?: PageTestimonialWhereInput | PageTestimonialWhereInput[]
    companyPageId?: StringFilter<"PageTestimonial"> | string
    authorName?: StringFilter<"PageTestimonial"> | string
    authorAvatar?: StringNullableFilter<"PageTestimonial"> | string | null
    rating?: IntFilter<"PageTestimonial"> | number
    text?: StringFilter<"PageTestimonial"> | string
    position?: IntFilter<"PageTestimonial"> | number
    createdAt?: DateTimeFilter<"PageTestimonial"> | Date | string
    updatedAt?: DateTimeFilter<"PageTestimonial"> | Date | string
    companyPage?: XOR<CompanyPageScalarRelationFilter, CompanyPageWhereInput>
  }, "id">

  export type PageTestimonialOrderByWithAggregationInput = {
    id?: SortOrder
    companyPageId?: SortOrder
    authorName?: SortOrder
    authorAvatar?: SortOrderInput | SortOrder
    rating?: SortOrder
    text?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PageTestimonialCountOrderByAggregateInput
    _avg?: PageTestimonialAvgOrderByAggregateInput
    _max?: PageTestimonialMaxOrderByAggregateInput
    _min?: PageTestimonialMinOrderByAggregateInput
    _sum?: PageTestimonialSumOrderByAggregateInput
  }

  export type PageTestimonialScalarWhereWithAggregatesInput = {
    AND?: PageTestimonialScalarWhereWithAggregatesInput | PageTestimonialScalarWhereWithAggregatesInput[]
    OR?: PageTestimonialScalarWhereWithAggregatesInput[]
    NOT?: PageTestimonialScalarWhereWithAggregatesInput | PageTestimonialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PageTestimonial"> | string
    companyPageId?: StringWithAggregatesFilter<"PageTestimonial"> | string
    authorName?: StringWithAggregatesFilter<"PageTestimonial"> | string
    authorAvatar?: StringNullableWithAggregatesFilter<"PageTestimonial"> | string | null
    rating?: IntWithAggregatesFilter<"PageTestimonial"> | number
    text?: StringWithAggregatesFilter<"PageTestimonial"> | string
    position?: IntWithAggregatesFilter<"PageTestimonial"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PageTestimonial"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PageTestimonial"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    companyId?: StringFilter<"Subscription"> | string
    plan?: EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    mpSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    mpPreapprovalPlanId?: StringNullableFilter<"Subscription"> | string | null
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    payments?: PaymentListRelationFilter
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    mpSubscriptionId?: SortOrderInput | SortOrder
    mpPreapprovalPlanId?: SortOrderInput | SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId?: string
    mpSubscriptionId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    plan?: EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    mpPreapprovalPlanId?: StringNullableFilter<"Subscription"> | string | null
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    payments?: PaymentListRelationFilter
  }, "id" | "companyId" | "mpSubscriptionId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    mpSubscriptionId?: SortOrderInput | SortOrder
    mpPreapprovalPlanId?: SortOrderInput | SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    companyId?: StringWithAggregatesFilter<"Subscription"> | string
    plan?: EnumSubscriptionPlanWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    mpSubscriptionId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    mpPreapprovalPlanId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    currentPeriodStart?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolWithAggregatesFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    subscriptionId?: StringFilter<"Payment"> | string
    mpPaymentId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    mpPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: SubscriptionOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mpPaymentId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    subscriptionId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
  }, "id" | "mpPaymentId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    mpPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    subscriptionId?: StringWithAggregatesFilter<"Payment"> | string
    mpPaymentId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type LeadCreateInput = {
    name: string
    email: string
    interest: $Enums.Interest
    ip: string
    createdAt?: Date | string
  }

  export type LeadUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    interest: $Enums.Interest
    ip: string
    createdAt?: Date | string
  }

  export type LeadUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    interest?: EnumInterestFieldUpdateOperationsInput | $Enums.Interest
    ip?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    interest?: EnumInterestFieldUpdateOperationsInput | $Enums.Interest
    ip?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateManyInput = {
    id?: number
    name: string
    email: string
    interest: $Enums.Interest
    ip: string
    createdAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    interest?: EnumInterestFieldUpdateOperationsInput | $Enums.Interest
    ip?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    interest?: EnumInterestFieldUpdateOperationsInput | $Enums.Interest
    ip?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitCreateInput = {
    ip: string
    count: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUncheckedCreateInput = {
    id?: number
    ip: string
    count: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUpdateInput = {
    ip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitCreateManyInput = {
    id?: number
    ip: string
    count: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUpdateManyMutationInput = {
    ip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkingHoursCreateInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    company: CompanyCreateNestedOneWithoutWorkingHoursInput
  }

  export type WorkingHoursUncheckedCreateInput = {
    id?: string
    companyId: string
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type WorkingHoursUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutWorkingHoursNestedInput
  }

  export type WorkingHoursUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type WorkingHoursCreateManyInput = {
    id?: string
    companyId: string
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type WorkingHoursUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type WorkingHoursUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutServicesInput
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
    professionals?: ProfessionalServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    companyId: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
    professionals?: ProfessionalServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutServicesNestedInput
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
    professionals?: ProfessionalServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
    professionals?: ProfessionalServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    companyId: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalServiceCreateInput = {
    id?: string
    professional: UserCreateNestedOneWithoutServicesInput
    service: ServiceCreateNestedOneWithoutProfessionalsInput
  }

  export type ProfessionalServiceUncheckedCreateInput = {
    id?: string
    professionalId: string
    serviceId: string
  }

  export type ProfessionalServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professional?: UserUpdateOneRequiredWithoutServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutProfessionalsNestedInput
  }

  export type ProfessionalServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalServiceCreateManyInput = {
    id?: string
    professionalId: string
    serviceId: string
  }

  export type ProfessionalServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    services?: ProfessionalServiceCreateNestedManyWithoutProfessionalInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ProfessionalServiceUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    services?: ProfessionalServiceUpdateManyWithoutProfessionalNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ProfessionalServiceUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    clientName: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutAppointmentsInput
    professional: UserCreateNestedOneWithoutAppointmentsInput
    client?: ClientCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    companyId: string
    professionalId: string
    clientName: string
    clientId?: string | null
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutAppointmentsNestedInput
    professional?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    client?: ClientUpdateOneWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    companyId: string
    professionalId: string
    clientName: string
    clientId?: string | null
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutClientsInput
    appointments?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    companyId: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutClientsNestedInput
    appointments?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    companyId: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyPageCreateInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutCompanyPageInput
    testimonials?: PageTestimonialCreateNestedManyWithoutCompanyPageInput
  }

  export type CompanyPageUncheckedCreateInput = {
    id?: string
    companyId: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testimonials?: PageTestimonialUncheckedCreateNestedManyWithoutCompanyPageInput
  }

  export type CompanyPageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCompanyPageNestedInput
    testimonials?: PageTestimonialUpdateManyWithoutCompanyPageNestedInput
  }

  export type CompanyPageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testimonials?: PageTestimonialUncheckedUpdateManyWithoutCompanyPageNestedInput
  }

  export type CompanyPageCreateManyInput = {
    id?: string
    companyId: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyPageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyPageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageTestimonialCreateInput = {
    id?: string
    authorName: string
    authorAvatar?: string | null
    rating?: number
    text: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    companyPage: CompanyPageCreateNestedOneWithoutTestimonialsInput
  }

  export type PageTestimonialUncheckedCreateInput = {
    id?: string
    companyPageId: string
    authorName: string
    authorAvatar?: string | null
    rating?: number
    text: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageTestimonialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyPage?: CompanyPageUpdateOneRequiredWithoutTestimonialsNestedInput
  }

  export type PageTestimonialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyPageId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageTestimonialCreateManyInput = {
    id?: string
    companyPageId: string
    authorName: string
    authorAvatar?: string | null
    rating?: number
    text: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageTestimonialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageTestimonialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyPageId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutSubscriptionInput
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    companyId: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutSubscriptionNestedInput
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    companyId: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    mpPaymentId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: SubscriptionCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    subscriptionId: string
    mpPaymentId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    subscriptionId: string
    mpPaymentId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumInterestFilter<$PrismaModel = never> = {
    equals?: $Enums.Interest | EnumInterestFieldRefInput<$PrismaModel>
    in?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    notIn?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestFilter<$PrismaModel> | $Enums.Interest
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    interest?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    interest?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    interest?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumInterestWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Interest | EnumInterestFieldRefInput<$PrismaModel>
    in?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    notIn?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestWithAggregatesFilter<$PrismaModel> | $Enums.Interest
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterestFilter<$PrismaModel>
    _max?: NestedEnumInterestFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RateLimitCountOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    count?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitAvgOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
  }

  export type RateLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    count?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitMinOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
    count?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitSumOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumContractTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractType | EnumContractTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContractTypeFilter<$PrismaModel> | $Enums.ContractType
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type WorkingHoursListRelationFilter = {
    every?: WorkingHoursWhereInput
    some?: WorkingHoursWhereInput
    none?: WorkingHoursWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type CompanyPageNullableScalarRelationFilter = {
    is?: CompanyPageWhereInput | null
    isNot?: CompanyPageWhereInput | null
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkingHoursOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrder
    cnpjCpf?: SortOrder
    endereco?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    contrato?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrder
    cnpjCpf?: SortOrder
    endereco?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    contrato?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrder
    cnpjCpf?: SortOrder
    endereco?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    contrato?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumContractTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractType | EnumContractTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContractTypeWithAggregatesFilter<$PrismaModel> | $Enums.ContractType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractTypeFilter<$PrismaModel>
    _max?: NestedEnumContractTypeFilter<$PrismaModel>
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type WorkingHoursCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
  }

  export type WorkingHoursAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type WorkingHoursMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
  }

  export type WorkingHoursMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
  }

  export type WorkingHoursSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProfessionalServiceListRelationFilter = {
    every?: ProfessionalServiceWhereInput
    some?: ProfessionalServiceWhereInput
    none?: ProfessionalServiceWhereInput
  }

  export type ProfessionalServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ProfessionalServiceProfessionalIdServiceIdCompoundUniqueInput = {
    professionalId: string
    serviceId: string
  }

  export type ProfessionalServiceCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
  }

  export type ProfessionalServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
  }

  export type ProfessionalServiceMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type ClientNullableScalarRelationFilter = {
    is?: ClientWhereInput | null
    isNot?: ClientWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    professionalId?: SortOrder
    clientName?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    professionalId?: SortOrder
    clientName?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    professionalId?: SortOrder
    clientName?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PageTestimonialListRelationFilter = {
    every?: PageTestimonialWhereInput
    some?: PageTestimonialWhereInput
    none?: PageTestimonialWhereInput
  }

  export type PageTestimonialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyPageCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    coverImage?: SortOrder
    primaryColor?: SortOrder
    accentColor?: SortOrder
    whatsapp?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrder
    showServices?: SortOrder
    showTestimonials?: SortOrder
    showAbout?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyPageMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    coverImage?: SortOrder
    primaryColor?: SortOrder
    accentColor?: SortOrder
    whatsapp?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrder
    showServices?: SortOrder
    showTestimonials?: SortOrder
    showAbout?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyPageMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    coverImage?: SortOrder
    primaryColor?: SortOrder
    accentColor?: SortOrder
    whatsapp?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrder
    showServices?: SortOrder
    showTestimonials?: SortOrder
    showAbout?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CompanyPageScalarRelationFilter = {
    is?: CompanyPageWhereInput
    isNot?: CompanyPageWhereInput
  }

  export type PageTestimonialCountOrderByAggregateInput = {
    id?: SortOrder
    companyPageId?: SortOrder
    authorName?: SortOrder
    authorAvatar?: SortOrder
    rating?: SortOrder
    text?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageTestimonialAvgOrderByAggregateInput = {
    rating?: SortOrder
    position?: SortOrder
  }

  export type PageTestimonialMaxOrderByAggregateInput = {
    id?: SortOrder
    companyPageId?: SortOrder
    authorName?: SortOrder
    authorAvatar?: SortOrder
    rating?: SortOrder
    text?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageTestimonialMinOrderByAggregateInput = {
    id?: SortOrder
    companyPageId?: SortOrder
    authorName?: SortOrder
    authorAvatar?: SortOrder
    rating?: SortOrder
    text?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageTestimonialSumOrderByAggregateInput = {
    rating?: SortOrder
    position?: SortOrder
  }

  export type EnumSubscriptionPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanFilter<$PrismaModel> | $Enums.SubscriptionPlan
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    mpSubscriptionId?: SortOrder
    mpPreapprovalPlanId?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    mpSubscriptionId?: SortOrder
    mpPreapprovalPlanId?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    mpSubscriptionId?: SortOrder
    mpPreapprovalPlanId?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSubscriptionPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type SubscriptionScalarRelationFilter = {
    is?: SubscriptionWhereInput
    isNot?: SubscriptionWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    mpPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    mpPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    mpPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumInterestFieldUpdateOperationsInput = {
    set?: $Enums.Interest
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AppointmentCreateWithoutCompanyInput, AppointmentUncheckedCreateWithoutCompanyInput> | AppointmentCreateWithoutCompanyInput[] | AppointmentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCompanyInput | AppointmentCreateOrConnectWithoutCompanyInput[]
    createMany?: AppointmentCreateManyCompanyInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ClientCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ClientCreateWithoutCompanyInput, ClientUncheckedCreateWithoutCompanyInput> | ClientCreateWithoutCompanyInput[] | ClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCompanyInput | ClientCreateOrConnectWithoutCompanyInput[]
    createMany?: ClientCreateManyCompanyInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type WorkingHoursCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WorkingHoursCreateWithoutCompanyInput, WorkingHoursUncheckedCreateWithoutCompanyInput> | WorkingHoursCreateWithoutCompanyInput[] | WorkingHoursUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkingHoursCreateOrConnectWithoutCompanyInput | WorkingHoursCreateOrConnectWithoutCompanyInput[]
    createMany?: WorkingHoursCreateManyCompanyInputEnvelope
    connect?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ServiceCreateWithoutCompanyInput, ServiceUncheckedCreateWithoutCompanyInput> | ServiceCreateWithoutCompanyInput[] | ServiceUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCompanyInput | ServiceCreateOrConnectWithoutCompanyInput[]
    createMany?: ServiceCreateManyCompanyInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CompanyPageCreateNestedOneWithoutCompanyInput = {
    create?: XOR<CompanyPageCreateWithoutCompanyInput, CompanyPageUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: CompanyPageCreateOrConnectWithoutCompanyInput
    connect?: CompanyPageWhereUniqueInput
  }

  export type SubscriptionCreateNestedOneWithoutCompanyInput = {
    create?: XOR<SubscriptionCreateWithoutCompanyInput, SubscriptionUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCompanyInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AppointmentCreateWithoutCompanyInput, AppointmentUncheckedCreateWithoutCompanyInput> | AppointmentCreateWithoutCompanyInput[] | AppointmentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCompanyInput | AppointmentCreateOrConnectWithoutCompanyInput[]
    createMany?: AppointmentCreateManyCompanyInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ClientCreateWithoutCompanyInput, ClientUncheckedCreateWithoutCompanyInput> | ClientCreateWithoutCompanyInput[] | ClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCompanyInput | ClientCreateOrConnectWithoutCompanyInput[]
    createMany?: ClientCreateManyCompanyInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WorkingHoursCreateWithoutCompanyInput, WorkingHoursUncheckedCreateWithoutCompanyInput> | WorkingHoursCreateWithoutCompanyInput[] | WorkingHoursUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkingHoursCreateOrConnectWithoutCompanyInput | WorkingHoursCreateOrConnectWithoutCompanyInput[]
    createMany?: WorkingHoursCreateManyCompanyInputEnvelope
    connect?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ServiceCreateWithoutCompanyInput, ServiceUncheckedCreateWithoutCompanyInput> | ServiceCreateWithoutCompanyInput[] | ServiceUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCompanyInput | ServiceCreateOrConnectWithoutCompanyInput[]
    createMany?: ServiceCreateManyCompanyInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CompanyPageUncheckedCreateNestedOneWithoutCompanyInput = {
    create?: XOR<CompanyPageCreateWithoutCompanyInput, CompanyPageUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: CompanyPageCreateOrConnectWithoutCompanyInput
    connect?: CompanyPageWhereUniqueInput
  }

  export type SubscriptionUncheckedCreateNestedOneWithoutCompanyInput = {
    create?: XOR<SubscriptionCreateWithoutCompanyInput, SubscriptionUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCompanyInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumContractTypeFieldUpdateOperationsInput = {
    set?: $Enums.ContractType
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AppointmentCreateWithoutCompanyInput, AppointmentUncheckedCreateWithoutCompanyInput> | AppointmentCreateWithoutCompanyInput[] | AppointmentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCompanyInput | AppointmentCreateOrConnectWithoutCompanyInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutCompanyInput | AppointmentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AppointmentCreateManyCompanyInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutCompanyInput | AppointmentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutCompanyInput | AppointmentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ClientUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ClientCreateWithoutCompanyInput, ClientUncheckedCreateWithoutCompanyInput> | ClientCreateWithoutCompanyInput[] | ClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCompanyInput | ClientCreateOrConnectWithoutCompanyInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutCompanyInput | ClientUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ClientCreateManyCompanyInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutCompanyInput | ClientUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutCompanyInput | ClientUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type WorkingHoursUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WorkingHoursCreateWithoutCompanyInput, WorkingHoursUncheckedCreateWithoutCompanyInput> | WorkingHoursCreateWithoutCompanyInput[] | WorkingHoursUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkingHoursCreateOrConnectWithoutCompanyInput | WorkingHoursCreateOrConnectWithoutCompanyInput[]
    upsert?: WorkingHoursUpsertWithWhereUniqueWithoutCompanyInput | WorkingHoursUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WorkingHoursCreateManyCompanyInputEnvelope
    set?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    disconnect?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    delete?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    connect?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    update?: WorkingHoursUpdateWithWhereUniqueWithoutCompanyInput | WorkingHoursUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WorkingHoursUpdateManyWithWhereWithoutCompanyInput | WorkingHoursUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WorkingHoursScalarWhereInput | WorkingHoursScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ServiceCreateWithoutCompanyInput, ServiceUncheckedCreateWithoutCompanyInput> | ServiceCreateWithoutCompanyInput[] | ServiceUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCompanyInput | ServiceCreateOrConnectWithoutCompanyInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCompanyInput | ServiceUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ServiceCreateManyCompanyInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCompanyInput | ServiceUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCompanyInput | ServiceUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CompanyPageUpdateOneWithoutCompanyNestedInput = {
    create?: XOR<CompanyPageCreateWithoutCompanyInput, CompanyPageUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: CompanyPageCreateOrConnectWithoutCompanyInput
    upsert?: CompanyPageUpsertWithoutCompanyInput
    disconnect?: CompanyPageWhereInput | boolean
    delete?: CompanyPageWhereInput | boolean
    connect?: CompanyPageWhereUniqueInput
    update?: XOR<XOR<CompanyPageUpdateToOneWithWhereWithoutCompanyInput, CompanyPageUpdateWithoutCompanyInput>, CompanyPageUncheckedUpdateWithoutCompanyInput>
  }

  export type SubscriptionUpdateOneWithoutCompanyNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCompanyInput, SubscriptionUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCompanyInput
    upsert?: SubscriptionUpsertWithoutCompanyInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutCompanyInput, SubscriptionUpdateWithoutCompanyInput>, SubscriptionUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AppointmentCreateWithoutCompanyInput, AppointmentUncheckedCreateWithoutCompanyInput> | AppointmentCreateWithoutCompanyInput[] | AppointmentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCompanyInput | AppointmentCreateOrConnectWithoutCompanyInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutCompanyInput | AppointmentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AppointmentCreateManyCompanyInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutCompanyInput | AppointmentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutCompanyInput | AppointmentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ClientCreateWithoutCompanyInput, ClientUncheckedCreateWithoutCompanyInput> | ClientCreateWithoutCompanyInput[] | ClientUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCompanyInput | ClientCreateOrConnectWithoutCompanyInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutCompanyInput | ClientUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ClientCreateManyCompanyInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutCompanyInput | ClientUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutCompanyInput | ClientUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WorkingHoursCreateWithoutCompanyInput, WorkingHoursUncheckedCreateWithoutCompanyInput> | WorkingHoursCreateWithoutCompanyInput[] | WorkingHoursUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkingHoursCreateOrConnectWithoutCompanyInput | WorkingHoursCreateOrConnectWithoutCompanyInput[]
    upsert?: WorkingHoursUpsertWithWhereUniqueWithoutCompanyInput | WorkingHoursUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WorkingHoursCreateManyCompanyInputEnvelope
    set?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    disconnect?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    delete?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    connect?: WorkingHoursWhereUniqueInput | WorkingHoursWhereUniqueInput[]
    update?: WorkingHoursUpdateWithWhereUniqueWithoutCompanyInput | WorkingHoursUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WorkingHoursUpdateManyWithWhereWithoutCompanyInput | WorkingHoursUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WorkingHoursScalarWhereInput | WorkingHoursScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ServiceCreateWithoutCompanyInput, ServiceUncheckedCreateWithoutCompanyInput> | ServiceCreateWithoutCompanyInput[] | ServiceUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCompanyInput | ServiceCreateOrConnectWithoutCompanyInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCompanyInput | ServiceUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ServiceCreateManyCompanyInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCompanyInput | ServiceUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCompanyInput | ServiceUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput = {
    create?: XOR<CompanyPageCreateWithoutCompanyInput, CompanyPageUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: CompanyPageCreateOrConnectWithoutCompanyInput
    upsert?: CompanyPageUpsertWithoutCompanyInput
    disconnect?: CompanyPageWhereInput | boolean
    delete?: CompanyPageWhereInput | boolean
    connect?: CompanyPageWhereUniqueInput
    update?: XOR<XOR<CompanyPageUpdateToOneWithWhereWithoutCompanyInput, CompanyPageUpdateWithoutCompanyInput>, CompanyPageUncheckedUpdateWithoutCompanyInput>
  }

  export type SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCompanyInput, SubscriptionUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCompanyInput
    upsert?: SubscriptionUpsertWithoutCompanyInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutCompanyInput, SubscriptionUpdateWithoutCompanyInput>, SubscriptionUncheckedUpdateWithoutCompanyInput>
  }

  export type CompanyCreateNestedOneWithoutWorkingHoursInput = {
    create?: XOR<CompanyCreateWithoutWorkingHoursInput, CompanyUncheckedCreateWithoutWorkingHoursInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutWorkingHoursInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutWorkingHoursNestedInput = {
    create?: XOR<CompanyCreateWithoutWorkingHoursInput, CompanyUncheckedCreateWithoutWorkingHoursInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutWorkingHoursInput
    upsert?: CompanyUpsertWithoutWorkingHoursInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutWorkingHoursInput, CompanyUpdateWithoutWorkingHoursInput>, CompanyUncheckedUpdateWithoutWorkingHoursInput>
  }

  export type CompanyCreateNestedOneWithoutServicesInput = {
    create?: XOR<CompanyCreateWithoutServicesInput, CompanyUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutServicesInput
    connect?: CompanyWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ProfessionalServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<ProfessionalServiceCreateWithoutServiceInput, ProfessionalServiceUncheckedCreateWithoutServiceInput> | ProfessionalServiceCreateWithoutServiceInput[] | ProfessionalServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutServiceInput | ProfessionalServiceCreateOrConnectWithoutServiceInput[]
    createMany?: ProfessionalServiceCreateManyServiceInputEnvelope
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ProfessionalServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ProfessionalServiceCreateWithoutServiceInput, ProfessionalServiceUncheckedCreateWithoutServiceInput> | ProfessionalServiceCreateWithoutServiceInput[] | ProfessionalServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutServiceInput | ProfessionalServiceCreateOrConnectWithoutServiceInput[]
    createMany?: ProfessionalServiceCreateManyServiceInputEnvelope
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<CompanyCreateWithoutServicesInput, CompanyUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutServicesInput
    upsert?: CompanyUpsertWithoutServicesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutServicesInput, CompanyUpdateWithoutServicesInput>, CompanyUncheckedUpdateWithoutServicesInput>
  }

  export type AppointmentUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ProfessionalServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ProfessionalServiceCreateWithoutServiceInput, ProfessionalServiceUncheckedCreateWithoutServiceInput> | ProfessionalServiceCreateWithoutServiceInput[] | ProfessionalServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutServiceInput | ProfessionalServiceCreateOrConnectWithoutServiceInput[]
    upsert?: ProfessionalServiceUpsertWithWhereUniqueWithoutServiceInput | ProfessionalServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ProfessionalServiceCreateManyServiceInputEnvelope
    set?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    disconnect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    delete?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    update?: ProfessionalServiceUpdateWithWhereUniqueWithoutServiceInput | ProfessionalServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ProfessionalServiceUpdateManyWithWhereWithoutServiceInput | ProfessionalServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ProfessionalServiceScalarWhereInput | ProfessionalServiceScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ProfessionalServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ProfessionalServiceCreateWithoutServiceInput, ProfessionalServiceUncheckedCreateWithoutServiceInput> | ProfessionalServiceCreateWithoutServiceInput[] | ProfessionalServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutServiceInput | ProfessionalServiceCreateOrConnectWithoutServiceInput[]
    upsert?: ProfessionalServiceUpsertWithWhereUniqueWithoutServiceInput | ProfessionalServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ProfessionalServiceCreateManyServiceInputEnvelope
    set?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    disconnect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    delete?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    update?: ProfessionalServiceUpdateWithWhereUniqueWithoutServiceInput | ProfessionalServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ProfessionalServiceUpdateManyWithWhereWithoutServiceInput | ProfessionalServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ProfessionalServiceScalarWhereInput | ProfessionalServiceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutServicesInput = {
    create?: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutProfessionalsInput = {
    create?: XOR<ServiceCreateWithoutProfessionalsInput, ServiceUncheckedCreateWithoutProfessionalsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutProfessionalsInput
    connect?: ServiceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesInput
    upsert?: UserUpsertWithoutServicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServicesInput, UserUpdateWithoutServicesInput>, UserUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutProfessionalsNestedInput = {
    create?: XOR<ServiceCreateWithoutProfessionalsInput, ServiceUncheckedCreateWithoutProfessionalsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutProfessionalsInput
    upsert?: ServiceUpsertWithoutProfessionalsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutProfessionalsInput, ServiceUpdateWithoutProfessionalsInput>, ServiceUncheckedUpdateWithoutProfessionalsInput>
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ProfessionalServiceCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalServiceCreateWithoutProfessionalInput, ProfessionalServiceUncheckedCreateWithoutProfessionalInput> | ProfessionalServiceCreateWithoutProfessionalInput[] | ProfessionalServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutProfessionalInput | ProfessionalServiceCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalServiceCreateManyProfessionalInputEnvelope
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ProfessionalServiceUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalServiceCreateWithoutProfessionalInput, ProfessionalServiceUncheckedCreateWithoutProfessionalInput> | ProfessionalServiceCreateWithoutProfessionalInput[] | ProfessionalServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutProfessionalInput | ProfessionalServiceCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalServiceCreateManyProfessionalInputEnvelope
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type CompanyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type AppointmentUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutProfessionalInput | AppointmentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutProfessionalInput | AppointmentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutProfessionalInput | AppointmentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ProfessionalServiceUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalServiceCreateWithoutProfessionalInput, ProfessionalServiceUncheckedCreateWithoutProfessionalInput> | ProfessionalServiceCreateWithoutProfessionalInput[] | ProfessionalServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutProfessionalInput | ProfessionalServiceCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalServiceUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalServiceUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalServiceCreateManyProfessionalInputEnvelope
    set?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    disconnect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    delete?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    update?: ProfessionalServiceUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalServiceUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalServiceUpdateManyWithWhereWithoutProfessionalInput | ProfessionalServiceUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalServiceScalarWhereInput | ProfessionalServiceScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutProfessionalInput | AppointmentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutProfessionalInput | AppointmentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutProfessionalInput | AppointmentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ProfessionalServiceUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalServiceCreateWithoutProfessionalInput, ProfessionalServiceUncheckedCreateWithoutProfessionalInput> | ProfessionalServiceCreateWithoutProfessionalInput[] | ProfessionalServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalServiceCreateOrConnectWithoutProfessionalInput | ProfessionalServiceCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalServiceUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalServiceUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalServiceCreateManyProfessionalInputEnvelope
    set?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    disconnect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    delete?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    connect?: ProfessionalServiceWhereUniqueInput | ProfessionalServiceWhereUniqueInput[]
    update?: ProfessionalServiceUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalServiceUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalServiceUpdateManyWithWhereWithoutProfessionalInput | ProfessionalServiceUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalServiceScalarWhereInput | ProfessionalServiceScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<CompanyCreateWithoutAppointmentsInput, CompanyUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAppointmentsInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAppointmentsInput
    connect?: ClientWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type CompanyUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<CompanyCreateWithoutAppointmentsInput, CompanyUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAppointmentsInput
    upsert?: CompanyUpsertWithoutAppointmentsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutAppointmentsInput, CompanyUpdateWithoutAppointmentsInput>, CompanyUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    upsert?: UserUpsertWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsInput, UserUpdateWithoutAppointmentsInput>, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClientUpdateOneWithoutAppointmentsNestedInput = {
    create?: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAppointmentsInput
    upsert?: ClientUpsertWithoutAppointmentsInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAppointmentsInput, ClientUpdateWithoutAppointmentsInput>, ClientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    upsert?: ServiceUpsertWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutAppointmentsInput, ServiceUpdateWithoutAppointmentsInput>, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type CompanyCreateNestedOneWithoutClientsInput = {
    create?: XOR<CompanyCreateWithoutClientsInput, CompanyUncheckedCreateWithoutClientsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutClientsInput
    connect?: CompanyWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<CompanyCreateWithoutClientsInput, CompanyUncheckedCreateWithoutClientsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutClientsInput
    upsert?: CompanyUpsertWithoutClientsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutClientsInput, CompanyUpdateWithoutClientsInput>, CompanyUncheckedUpdateWithoutClientsInput>
  }

  export type AppointmentUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput> | AppointmentCreateWithoutClientInput[] | AppointmentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClientInput | AppointmentCreateOrConnectWithoutClientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClientInput | AppointmentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AppointmentCreateManyClientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClientInput | AppointmentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClientInput | AppointmentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutCompanyPageInput = {
    create?: XOR<CompanyCreateWithoutCompanyPageInput, CompanyUncheckedCreateWithoutCompanyPageInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCompanyPageInput
    connect?: CompanyWhereUniqueInput
  }

  export type PageTestimonialCreateNestedManyWithoutCompanyPageInput = {
    create?: XOR<PageTestimonialCreateWithoutCompanyPageInput, PageTestimonialUncheckedCreateWithoutCompanyPageInput> | PageTestimonialCreateWithoutCompanyPageInput[] | PageTestimonialUncheckedCreateWithoutCompanyPageInput[]
    connectOrCreate?: PageTestimonialCreateOrConnectWithoutCompanyPageInput | PageTestimonialCreateOrConnectWithoutCompanyPageInput[]
    createMany?: PageTestimonialCreateManyCompanyPageInputEnvelope
    connect?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
  }

  export type PageTestimonialUncheckedCreateNestedManyWithoutCompanyPageInput = {
    create?: XOR<PageTestimonialCreateWithoutCompanyPageInput, PageTestimonialUncheckedCreateWithoutCompanyPageInput> | PageTestimonialCreateWithoutCompanyPageInput[] | PageTestimonialUncheckedCreateWithoutCompanyPageInput[]
    connectOrCreate?: PageTestimonialCreateOrConnectWithoutCompanyPageInput | PageTestimonialCreateOrConnectWithoutCompanyPageInput[]
    createMany?: PageTestimonialCreateManyCompanyPageInputEnvelope
    connect?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneRequiredWithoutCompanyPageNestedInput = {
    create?: XOR<CompanyCreateWithoutCompanyPageInput, CompanyUncheckedCreateWithoutCompanyPageInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCompanyPageInput
    upsert?: CompanyUpsertWithoutCompanyPageInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCompanyPageInput, CompanyUpdateWithoutCompanyPageInput>, CompanyUncheckedUpdateWithoutCompanyPageInput>
  }

  export type PageTestimonialUpdateManyWithoutCompanyPageNestedInput = {
    create?: XOR<PageTestimonialCreateWithoutCompanyPageInput, PageTestimonialUncheckedCreateWithoutCompanyPageInput> | PageTestimonialCreateWithoutCompanyPageInput[] | PageTestimonialUncheckedCreateWithoutCompanyPageInput[]
    connectOrCreate?: PageTestimonialCreateOrConnectWithoutCompanyPageInput | PageTestimonialCreateOrConnectWithoutCompanyPageInput[]
    upsert?: PageTestimonialUpsertWithWhereUniqueWithoutCompanyPageInput | PageTestimonialUpsertWithWhereUniqueWithoutCompanyPageInput[]
    createMany?: PageTestimonialCreateManyCompanyPageInputEnvelope
    set?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    disconnect?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    delete?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    connect?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    update?: PageTestimonialUpdateWithWhereUniqueWithoutCompanyPageInput | PageTestimonialUpdateWithWhereUniqueWithoutCompanyPageInput[]
    updateMany?: PageTestimonialUpdateManyWithWhereWithoutCompanyPageInput | PageTestimonialUpdateManyWithWhereWithoutCompanyPageInput[]
    deleteMany?: PageTestimonialScalarWhereInput | PageTestimonialScalarWhereInput[]
  }

  export type PageTestimonialUncheckedUpdateManyWithoutCompanyPageNestedInput = {
    create?: XOR<PageTestimonialCreateWithoutCompanyPageInput, PageTestimonialUncheckedCreateWithoutCompanyPageInput> | PageTestimonialCreateWithoutCompanyPageInput[] | PageTestimonialUncheckedCreateWithoutCompanyPageInput[]
    connectOrCreate?: PageTestimonialCreateOrConnectWithoutCompanyPageInput | PageTestimonialCreateOrConnectWithoutCompanyPageInput[]
    upsert?: PageTestimonialUpsertWithWhereUniqueWithoutCompanyPageInput | PageTestimonialUpsertWithWhereUniqueWithoutCompanyPageInput[]
    createMany?: PageTestimonialCreateManyCompanyPageInputEnvelope
    set?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    disconnect?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    delete?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    connect?: PageTestimonialWhereUniqueInput | PageTestimonialWhereUniqueInput[]
    update?: PageTestimonialUpdateWithWhereUniqueWithoutCompanyPageInput | PageTestimonialUpdateWithWhereUniqueWithoutCompanyPageInput[]
    updateMany?: PageTestimonialUpdateManyWithWhereWithoutCompanyPageInput | PageTestimonialUpdateManyWithWhereWithoutCompanyPageInput[]
    deleteMany?: PageTestimonialScalarWhereInput | PageTestimonialScalarWhereInput[]
  }

  export type CompanyPageCreateNestedOneWithoutTestimonialsInput = {
    create?: XOR<CompanyPageCreateWithoutTestimonialsInput, CompanyPageUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: CompanyPageCreateOrConnectWithoutTestimonialsInput
    connect?: CompanyPageWhereUniqueInput
  }

  export type CompanyPageUpdateOneRequiredWithoutTestimonialsNestedInput = {
    create?: XOR<CompanyPageCreateWithoutTestimonialsInput, CompanyPageUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: CompanyPageCreateOrConnectWithoutTestimonialsInput
    upsert?: CompanyPageUpsertWithoutTestimonialsInput
    connect?: CompanyPageWhereUniqueInput
    update?: XOR<XOR<CompanyPageUpdateToOneWithWhereWithoutTestimonialsInput, CompanyPageUpdateWithoutTestimonialsInput>, CompanyPageUncheckedUpdateWithoutTestimonialsInput>
  }

  export type CompanyCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<CompanyCreateWithoutSubscriptionInput, CompanyUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutSubscriptionInput
    connect?: CompanyWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EnumSubscriptionPlanFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionPlan
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CompanyUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: XOR<CompanyCreateWithoutSubscriptionInput, CompanyUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutSubscriptionInput
    upsert?: CompanyUpsertWithoutSubscriptionInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutSubscriptionInput, CompanyUpdateWithoutSubscriptionInput>, CompanyUncheckedUpdateWithoutSubscriptionInput>
  }

  export type PaymentUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSubscriptionInput | PaymentUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSubscriptionInput | PaymentUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type SubscriptionCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPaymentsInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPaymentsInput
    upsert?: SubscriptionUpsertWithoutPaymentsInput
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutPaymentsInput, SubscriptionUpdateWithoutPaymentsInput>, SubscriptionUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumInterestFilter<$PrismaModel = never> = {
    equals?: $Enums.Interest | EnumInterestFieldRefInput<$PrismaModel>
    in?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    notIn?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestFilter<$PrismaModel> | $Enums.Interest
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumInterestWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Interest | EnumInterestFieldRefInput<$PrismaModel>
    in?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    notIn?: $Enums.Interest[] | ListEnumInterestFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestWithAggregatesFilter<$PrismaModel> | $Enums.Interest
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterestFilter<$PrismaModel>
    _max?: NestedEnumInterestFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumContractTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractType | EnumContractTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContractTypeFilter<$PrismaModel> | $Enums.ContractType
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumContractTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractType | EnumContractTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractType[] | ListEnumContractTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContractTypeWithAggregatesFilter<$PrismaModel> | $Enums.ContractType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractTypeFilter<$PrismaModel>
    _max?: NestedEnumContractTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanFilter<$PrismaModel> | $Enums.SubscriptionPlan
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    services?: ProfessionalServiceCreateNestedManyWithoutProfessionalInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ProfessionalServiceUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutCompanyInput = {
    id?: string
    clientName: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: UserCreateNestedOneWithoutAppointmentsInput
    client?: ClientCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutCompanyInput = {
    id?: string
    professionalId: string
    clientName: string
    clientId?: string | null
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutCompanyInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutCompanyInput, AppointmentUncheckedCreateWithoutCompanyInput>
  }

  export type AppointmentCreateManyCompanyInputEnvelope = {
    data: AppointmentCreateManyCompanyInput | AppointmentCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutCompanyInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutCompanyInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutCompanyInput, ClientUncheckedCreateWithoutCompanyInput>
  }

  export type ClientCreateManyCompanyInputEnvelope = {
    data: ClientCreateManyCompanyInput | ClientCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type WorkingHoursCreateWithoutCompanyInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type WorkingHoursUncheckedCreateWithoutCompanyInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type WorkingHoursCreateOrConnectWithoutCompanyInput = {
    where: WorkingHoursWhereUniqueInput
    create: XOR<WorkingHoursCreateWithoutCompanyInput, WorkingHoursUncheckedCreateWithoutCompanyInput>
  }

  export type WorkingHoursCreateManyCompanyInputEnvelope = {
    data: WorkingHoursCreateManyCompanyInput | WorkingHoursCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutCompanyInput = {
    id?: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
    professionals?: ProfessionalServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
    professionals?: ProfessionalServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCompanyInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCompanyInput, ServiceUncheckedCreateWithoutCompanyInput>
  }

  export type ServiceCreateManyCompanyInputEnvelope = {
    data: ServiceCreateManyCompanyInput | ServiceCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CompanyPageCreateWithoutCompanyInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testimonials?: PageTestimonialCreateNestedManyWithoutCompanyPageInput
  }

  export type CompanyPageUncheckedCreateWithoutCompanyInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testimonials?: PageTestimonialUncheckedCreateNestedManyWithoutCompanyPageInput
  }

  export type CompanyPageCreateOrConnectWithoutCompanyInput = {
    where: CompanyPageWhereUniqueInput
    create: XOR<CompanyPageCreateWithoutCompanyInput, CompanyPageUncheckedCreateWithoutCompanyInput>
  }

  export type SubscriptionCreateWithoutCompanyInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutCompanyInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutCompanyInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutCompanyInput, SubscriptionUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    companyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutCompanyInput, AppointmentUncheckedUpdateWithoutCompanyInput>
    create: XOR<AppointmentCreateWithoutCompanyInput, AppointmentUncheckedCreateWithoutCompanyInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutCompanyInput, AppointmentUncheckedUpdateWithoutCompanyInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutCompanyInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    companyId?: StringFilter<"Appointment"> | string
    professionalId?: StringFilter<"Appointment"> | string
    clientName?: StringFilter<"Appointment"> | string
    clientId?: StringNullableFilter<"Appointment"> | string | null
    serviceId?: StringFilter<"Appointment"> | string
    price?: FloatNullableFilter<"Appointment"> | number | null
    startTime?: DateTimeFilter<"Appointment"> | Date | string
    endTime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type ClientUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutCompanyInput, ClientUncheckedUpdateWithoutCompanyInput>
    create: XOR<ClientCreateWithoutCompanyInput, ClientUncheckedCreateWithoutCompanyInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutCompanyInput, ClientUncheckedUpdateWithoutCompanyInput>
  }

  export type ClientUpdateManyWithWhereWithoutCompanyInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: StringFilter<"Client"> | string
    companyId?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    phone?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
  }

  export type WorkingHoursUpsertWithWhereUniqueWithoutCompanyInput = {
    where: WorkingHoursWhereUniqueInput
    update: XOR<WorkingHoursUpdateWithoutCompanyInput, WorkingHoursUncheckedUpdateWithoutCompanyInput>
    create: XOR<WorkingHoursCreateWithoutCompanyInput, WorkingHoursUncheckedCreateWithoutCompanyInput>
  }

  export type WorkingHoursUpdateWithWhereUniqueWithoutCompanyInput = {
    where: WorkingHoursWhereUniqueInput
    data: XOR<WorkingHoursUpdateWithoutCompanyInput, WorkingHoursUncheckedUpdateWithoutCompanyInput>
  }

  export type WorkingHoursUpdateManyWithWhereWithoutCompanyInput = {
    where: WorkingHoursScalarWhereInput
    data: XOR<WorkingHoursUpdateManyMutationInput, WorkingHoursUncheckedUpdateManyWithoutCompanyInput>
  }

  export type WorkingHoursScalarWhereInput = {
    AND?: WorkingHoursScalarWhereInput | WorkingHoursScalarWhereInput[]
    OR?: WorkingHoursScalarWhereInput[]
    NOT?: WorkingHoursScalarWhereInput | WorkingHoursScalarWhereInput[]
    id?: StringFilter<"WorkingHours"> | string
    companyId?: StringFilter<"WorkingHours"> | string
    dayOfWeek?: IntFilter<"WorkingHours"> | number
    openTime?: StringFilter<"WorkingHours"> | string
    closeTime?: StringFilter<"WorkingHours"> | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCompanyInput, ServiceUncheckedUpdateWithoutCompanyInput>
    create: XOR<ServiceCreateWithoutCompanyInput, ServiceUncheckedCreateWithoutCompanyInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCompanyInput, ServiceUncheckedUpdateWithoutCompanyInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCompanyInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    companyId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    price?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type CompanyPageUpsertWithoutCompanyInput = {
    update: XOR<CompanyPageUpdateWithoutCompanyInput, CompanyPageUncheckedUpdateWithoutCompanyInput>
    create: XOR<CompanyPageCreateWithoutCompanyInput, CompanyPageUncheckedCreateWithoutCompanyInput>
    where?: CompanyPageWhereInput
  }

  export type CompanyPageUpdateToOneWithWhereWithoutCompanyInput = {
    where?: CompanyPageWhereInput
    data: XOR<CompanyPageUpdateWithoutCompanyInput, CompanyPageUncheckedUpdateWithoutCompanyInput>
  }

  export type CompanyPageUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testimonials?: PageTestimonialUpdateManyWithoutCompanyPageNestedInput
  }

  export type CompanyPageUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testimonials?: PageTestimonialUncheckedUpdateManyWithoutCompanyPageNestedInput
  }

  export type SubscriptionUpsertWithoutCompanyInput = {
    update: XOR<SubscriptionUpdateWithoutCompanyInput, SubscriptionUncheckedUpdateWithoutCompanyInput>
    create: XOR<SubscriptionCreateWithoutCompanyInput, SubscriptionUncheckedCreateWithoutCompanyInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutCompanyInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutCompanyInput, SubscriptionUncheckedUpdateWithoutCompanyInput>
  }

  export type SubscriptionUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type CompanyCreateWithoutWorkingHoursInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutWorkingHoursInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutWorkingHoursInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutWorkingHoursInput, CompanyUncheckedCreateWithoutWorkingHoursInput>
  }

  export type CompanyUpsertWithoutWorkingHoursInput = {
    update: XOR<CompanyUpdateWithoutWorkingHoursInput, CompanyUncheckedUpdateWithoutWorkingHoursInput>
    create: XOR<CompanyCreateWithoutWorkingHoursInput, CompanyUncheckedCreateWithoutWorkingHoursInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutWorkingHoursInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutWorkingHoursInput, CompanyUncheckedUpdateWithoutWorkingHoursInput>
  }

  export type CompanyUpdateWithoutWorkingHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutWorkingHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutServicesInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutServicesInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutServicesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutServicesInput, CompanyUncheckedCreateWithoutServicesInput>
  }

  export type AppointmentCreateWithoutServiceInput = {
    id?: string
    clientName: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutAppointmentsInput
    professional: UserCreateNestedOneWithoutAppointmentsInput
    client?: ClientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutServiceInput = {
    id?: string
    companyId: string
    professionalId: string
    clientName: string
    clientId?: string | null
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentCreateManyServiceInputEnvelope = {
    data: AppointmentCreateManyServiceInput | AppointmentCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalServiceCreateWithoutServiceInput = {
    id?: string
    professional: UserCreateNestedOneWithoutServicesInput
  }

  export type ProfessionalServiceUncheckedCreateWithoutServiceInput = {
    id?: string
    professionalId: string
  }

  export type ProfessionalServiceCreateOrConnectWithoutServiceInput = {
    where: ProfessionalServiceWhereUniqueInput
    create: XOR<ProfessionalServiceCreateWithoutServiceInput, ProfessionalServiceUncheckedCreateWithoutServiceInput>
  }

  export type ProfessionalServiceCreateManyServiceInputEnvelope = {
    data: ProfessionalServiceCreateManyServiceInput | ProfessionalServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutServicesInput = {
    update: XOR<CompanyUpdateWithoutServicesInput, CompanyUncheckedUpdateWithoutServicesInput>
    create: XOR<CompanyCreateWithoutServicesInput, CompanyUncheckedCreateWithoutServicesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutServicesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutServicesInput, CompanyUncheckedUpdateWithoutServicesInput>
  }

  export type CompanyUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutServiceInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutServiceInput>
  }

  export type ProfessionalServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: ProfessionalServiceWhereUniqueInput
    update: XOR<ProfessionalServiceUpdateWithoutServiceInput, ProfessionalServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<ProfessionalServiceCreateWithoutServiceInput, ProfessionalServiceUncheckedCreateWithoutServiceInput>
  }

  export type ProfessionalServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: ProfessionalServiceWhereUniqueInput
    data: XOR<ProfessionalServiceUpdateWithoutServiceInput, ProfessionalServiceUncheckedUpdateWithoutServiceInput>
  }

  export type ProfessionalServiceUpdateManyWithWhereWithoutServiceInput = {
    where: ProfessionalServiceScalarWhereInput
    data: XOR<ProfessionalServiceUpdateManyMutationInput, ProfessionalServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type ProfessionalServiceScalarWhereInput = {
    AND?: ProfessionalServiceScalarWhereInput | ProfessionalServiceScalarWhereInput[]
    OR?: ProfessionalServiceScalarWhereInput[]
    NOT?: ProfessionalServiceScalarWhereInput | ProfessionalServiceScalarWhereInput[]
    id?: StringFilter<"ProfessionalService"> | string
    professionalId?: StringFilter<"ProfessionalService"> | string
    serviceId?: StringFilter<"ProfessionalService"> | string
  }

  export type UserCreateWithoutServicesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
  }

  export type UserUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type UserCreateOrConnectWithoutServicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
  }

  export type ServiceCreateWithoutProfessionalsInput = {
    id?: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutServicesInput
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutProfessionalsInput = {
    id?: string
    companyId: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutProfessionalsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutProfessionalsInput, ServiceUncheckedCreateWithoutProfessionalsInput>
  }

  export type UserUpsertWithoutServicesInput = {
    update: XOR<UserUpdateWithoutServicesInput, UserUncheckedUpdateWithoutServicesInput>
    create: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServicesInput, UserUncheckedUpdateWithoutServicesInput>
  }

  export type UserUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
  }

  export type UserUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ServiceUpsertWithoutProfessionalsInput = {
    update: XOR<ServiceUpdateWithoutProfessionalsInput, ServiceUncheckedUpdateWithoutProfessionalsInput>
    create: XOR<ServiceCreateWithoutProfessionalsInput, ServiceUncheckedCreateWithoutProfessionalsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutProfessionalsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutProfessionalsInput, ServiceUncheckedUpdateWithoutProfessionalsInput>
  }

  export type ServiceUpdateWithoutProfessionalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutServicesNestedInput
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutProfessionalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type AppointmentCreateWithoutProfessionalInput = {
    id?: string
    clientName: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutAppointmentsInput
    client?: ClientCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutProfessionalInput = {
    id?: string
    companyId: string
    clientName: string
    clientId?: string | null
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutProfessionalInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput>
  }

  export type AppointmentCreateManyProfessionalInputEnvelope = {
    data: AppointmentCreateManyProfessionalInput | AppointmentCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalServiceCreateWithoutProfessionalInput = {
    id?: string
    service: ServiceCreateNestedOneWithoutProfessionalsInput
  }

  export type ProfessionalServiceUncheckedCreateWithoutProfessionalInput = {
    id?: string
    serviceId: string
  }

  export type ProfessionalServiceCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalServiceWhereUniqueInput
    create: XOR<ProfessionalServiceCreateWithoutProfessionalInput, ProfessionalServiceUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalServiceCreateManyProfessionalInputEnvelope = {
    data: ProfessionalServiceCreateManyProfessionalInput | ProfessionalServiceCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutProfessionalInput, AppointmentUncheckedUpdateWithoutProfessionalInput>
    create: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutProfessionalInput, AppointmentUncheckedUpdateWithoutProfessionalInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutProfessionalInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalServiceUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalServiceWhereUniqueInput
    update: XOR<ProfessionalServiceUpdateWithoutProfessionalInput, ProfessionalServiceUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalServiceCreateWithoutProfessionalInput, ProfessionalServiceUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalServiceUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalServiceWhereUniqueInput
    data: XOR<ProfessionalServiceUpdateWithoutProfessionalInput, ProfessionalServiceUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalServiceUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalServiceScalarWhereInput
    data: XOR<ProfessionalServiceUpdateManyMutationInput, ProfessionalServiceUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type CompanyCreateWithoutAppointmentsInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutAppointmentsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutAppointmentsInput, CompanyUncheckedCreateWithoutAppointmentsInput>
  }

  export type UserCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
    services?: ProfessionalServiceCreateNestedManyWithoutProfessionalInput
  }

  export type UserUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ProfessionalServiceUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type UserCreateOrConnectWithoutAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
  }

  export type ClientCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutClientsInput
  }

  export type ClientUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    companyId: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutAppointmentsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
  }

  export type ServiceCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutServicesInput
    professionals?: ProfessionalServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    companyId: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    professionals?: ProfessionalServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutAppointmentsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
  }

  export type CompanyUpsertWithoutAppointmentsInput = {
    update: XOR<CompanyUpdateWithoutAppointmentsInput, CompanyUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<CompanyCreateWithoutAppointmentsInput, CompanyUncheckedCreateWithoutAppointmentsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutAppointmentsInput, CompanyUncheckedUpdateWithoutAppointmentsInput>
  }

  export type CompanyUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type UserUpsertWithoutAppointmentsInput = {
    update: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
    services?: ProfessionalServiceUpdateManyWithoutProfessionalNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ProfessionalServiceUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ClientUpsertWithoutAppointmentsInput = {
    update: XOR<ClientUpdateWithoutAppointmentsInput, ClientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ClientCreateWithoutAppointmentsInput, ClientUncheckedCreateWithoutAppointmentsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAppointmentsInput, ClientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClientUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutClientsNestedInput
  }

  export type ClientUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpsertWithoutAppointmentsInput = {
    update: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutServicesNestedInput
    professionals?: ProfessionalServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type CompanyCreateWithoutClientsInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutClientsInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutClientsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutClientsInput, CompanyUncheckedCreateWithoutClientsInput>
  }

  export type AppointmentCreateWithoutClientInput = {
    id?: string
    clientName: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutAppointmentsInput
    professional: UserCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutClientInput = {
    id?: string
    companyId: string
    professionalId: string
    clientName: string
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentCreateManyClientInputEnvelope = {
    data: AppointmentCreateManyClientInput | AppointmentCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutClientsInput = {
    update: XOR<CompanyUpdateWithoutClientsInput, CompanyUncheckedUpdateWithoutClientsInput>
    create: XOR<CompanyCreateWithoutClientsInput, CompanyUncheckedCreateWithoutClientsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutClientsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutClientsInput, CompanyUncheckedUpdateWithoutClientsInput>
  }

  export type CompanyUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
    create: XOR<AppointmentCreateWithoutClientInput, AppointmentUncheckedCreateWithoutClientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClientInput, AppointmentUncheckedUpdateWithoutClientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClientInput>
  }

  export type CompanyCreateWithoutCompanyPageInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    subscription?: SubscriptionCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCompanyPageInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCompanyPageInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCompanyPageInput, CompanyUncheckedCreateWithoutCompanyPageInput>
  }

  export type PageTestimonialCreateWithoutCompanyPageInput = {
    id?: string
    authorName: string
    authorAvatar?: string | null
    rating?: number
    text: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageTestimonialUncheckedCreateWithoutCompanyPageInput = {
    id?: string
    authorName: string
    authorAvatar?: string | null
    rating?: number
    text: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageTestimonialCreateOrConnectWithoutCompanyPageInput = {
    where: PageTestimonialWhereUniqueInput
    create: XOR<PageTestimonialCreateWithoutCompanyPageInput, PageTestimonialUncheckedCreateWithoutCompanyPageInput>
  }

  export type PageTestimonialCreateManyCompanyPageInputEnvelope = {
    data: PageTestimonialCreateManyCompanyPageInput | PageTestimonialCreateManyCompanyPageInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutCompanyPageInput = {
    update: XOR<CompanyUpdateWithoutCompanyPageInput, CompanyUncheckedUpdateWithoutCompanyPageInput>
    create: XOR<CompanyCreateWithoutCompanyPageInput, CompanyUncheckedCreateWithoutCompanyPageInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCompanyPageInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCompanyPageInput, CompanyUncheckedUpdateWithoutCompanyPageInput>
  }

  export type CompanyUpdateWithoutCompanyPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    subscription?: SubscriptionUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCompanyPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    subscription?: SubscriptionUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type PageTestimonialUpsertWithWhereUniqueWithoutCompanyPageInput = {
    where: PageTestimonialWhereUniqueInput
    update: XOR<PageTestimonialUpdateWithoutCompanyPageInput, PageTestimonialUncheckedUpdateWithoutCompanyPageInput>
    create: XOR<PageTestimonialCreateWithoutCompanyPageInput, PageTestimonialUncheckedCreateWithoutCompanyPageInput>
  }

  export type PageTestimonialUpdateWithWhereUniqueWithoutCompanyPageInput = {
    where: PageTestimonialWhereUniqueInput
    data: XOR<PageTestimonialUpdateWithoutCompanyPageInput, PageTestimonialUncheckedUpdateWithoutCompanyPageInput>
  }

  export type PageTestimonialUpdateManyWithWhereWithoutCompanyPageInput = {
    where: PageTestimonialScalarWhereInput
    data: XOR<PageTestimonialUpdateManyMutationInput, PageTestimonialUncheckedUpdateManyWithoutCompanyPageInput>
  }

  export type PageTestimonialScalarWhereInput = {
    AND?: PageTestimonialScalarWhereInput | PageTestimonialScalarWhereInput[]
    OR?: PageTestimonialScalarWhereInput[]
    NOT?: PageTestimonialScalarWhereInput | PageTestimonialScalarWhereInput[]
    id?: StringFilter<"PageTestimonial"> | string
    companyPageId?: StringFilter<"PageTestimonial"> | string
    authorName?: StringFilter<"PageTestimonial"> | string
    authorAvatar?: StringNullableFilter<"PageTestimonial"> | string | null
    rating?: IntFilter<"PageTestimonial"> | number
    text?: StringFilter<"PageTestimonial"> | string
    position?: IntFilter<"PageTestimonial"> | number
    createdAt?: DateTimeFilter<"PageTestimonial"> | Date | string
    updatedAt?: DateTimeFilter<"PageTestimonial"> | Date | string
  }

  export type CompanyPageCreateWithoutTestimonialsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutCompanyPageInput
  }

  export type CompanyPageUncheckedCreateWithoutTestimonialsInput = {
    id?: string
    companyId: string
    slug: string
    title: string
    description?: string | null
    logo?: string | null
    coverImage?: string | null
    primaryColor?: string
    accentColor?: string
    whatsapp?: string | null
    instagram?: string | null
    facebook?: string | null
    address?: string | null
    showServices?: boolean
    showTestimonials?: boolean
    showAbout?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyPageCreateOrConnectWithoutTestimonialsInput = {
    where: CompanyPageWhereUniqueInput
    create: XOR<CompanyPageCreateWithoutTestimonialsInput, CompanyPageUncheckedCreateWithoutTestimonialsInput>
  }

  export type CompanyPageUpsertWithoutTestimonialsInput = {
    update: XOR<CompanyPageUpdateWithoutTestimonialsInput, CompanyPageUncheckedUpdateWithoutTestimonialsInput>
    create: XOR<CompanyPageCreateWithoutTestimonialsInput, CompanyPageUncheckedCreateWithoutTestimonialsInput>
    where?: CompanyPageWhereInput
  }

  export type CompanyPageUpdateToOneWithWhereWithoutTestimonialsInput = {
    where?: CompanyPageWhereInput
    data: XOR<CompanyPageUpdateWithoutTestimonialsInput, CompanyPageUncheckedUpdateWithoutTestimonialsInput>
  }

  export type CompanyPageUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCompanyPageNestedInput
  }

  export type CompanyPageUncheckedUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    accentColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    showServices?: BoolFieldUpdateOperationsInput | boolean
    showTestimonials?: BoolFieldUpdateOperationsInput | boolean
    showAbout?: BoolFieldUpdateOperationsInput | boolean
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateWithoutSubscriptionInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentCreateNestedManyWithoutCompanyInput
    clients?: ClientCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursCreateNestedManyWithoutCompanyInput
    services?: ServiceCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    nomeFantasia: string
    razaoSocial?: string | null
    cnpjCpf: string
    endereco?: string | null
    telefone?: string | null
    email?: string | null
    contrato?: $Enums.ContractType
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutCompanyInput
    clients?: ClientUncheckedCreateNestedManyWithoutCompanyInput
    workingHours?: WorkingHoursUncheckedCreateNestedManyWithoutCompanyInput
    services?: ServiceUncheckedCreateNestedManyWithoutCompanyInput
    companyPage?: CompanyPageUncheckedCreateNestedOneWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutSubscriptionInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutSubscriptionInput, CompanyUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentCreateWithoutSubscriptionInput = {
    id?: string
    mpPaymentId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    mpPaymentId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentCreateManySubscriptionInputEnvelope = {
    data: PaymentCreateManySubscriptionInput | PaymentCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutSubscriptionInput = {
    update: XOR<CompanyUpdateWithoutSubscriptionInput, CompanyUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<CompanyCreateWithoutSubscriptionInput, CompanyUncheckedCreateWithoutSubscriptionInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutSubscriptionInput, CompanyUncheckedUpdateWithoutSubscriptionInput>
  }

  export type CompanyUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUpdateManyWithoutCompanyNestedInput
    clients?: ClientUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUpdateManyWithoutCompanyNestedInput
    services?: ServiceUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUpdateOneWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeFantasia?: StringFieldUpdateOperationsInput | string
    razaoSocial?: NullableStringFieldUpdateOperationsInput | string | null
    cnpjCpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contrato?: EnumContractTypeFieldUpdateOperationsInput | $Enums.ContractType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutCompanyNestedInput
    clients?: ClientUncheckedUpdateManyWithoutCompanyNestedInput
    workingHours?: WorkingHoursUncheckedUpdateManyWithoutCompanyNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCompanyNestedInput
    companyPage?: CompanyPageUncheckedUpdateOneWithoutCompanyNestedInput
  }

  export type PaymentUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutSubscriptionInput, PaymentUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutSubscriptionInput, PaymentUncheckedUpdateWithoutSubscriptionInput>
  }

  export type PaymentUpdateManyWithWhereWithoutSubscriptionInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    subscriptionId?: StringFilter<"Payment"> | string
    mpPaymentId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type SubscriptionCreateWithoutPaymentsInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutPaymentsInput = {
    id?: string
    companyId: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    mpSubscriptionId?: string | null
    mpPreapprovalPlanId?: string | null
    currentPeriodStart?: Date | string
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutPaymentsInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
  }

  export type SubscriptionUpsertWithoutPaymentsInput = {
    update: XOR<SubscriptionUpdateWithoutPaymentsInput, SubscriptionUncheckedUpdateWithoutPaymentsInput>
    create: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutPaymentsInput, SubscriptionUncheckedUpdateWithoutPaymentsInput>
  }

  export type SubscriptionUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    mpSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    mpPreapprovalPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyCompanyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyCompanyInput = {
    id?: string
    professionalId: string
    clientName: string
    clientId?: string | null
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateManyCompanyInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkingHoursCreateManyCompanyInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
  }

  export type ServiceCreateManyCompanyInput = {
    id?: string
    name: string
    price: number
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    services?: ProfessionalServiceUpdateManyWithoutProfessionalNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ProfessionalServiceUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    client?: ClientUpdateOneWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkingHoursUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type WorkingHoursUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type WorkingHoursUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
    professionals?: ProfessionalServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
    professionals?: ProfessionalServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyServiceInput = {
    id?: string
    companyId: string
    professionalId: string
    clientName: string
    clientId?: string | null
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalServiceCreateManyServiceInput = {
    id?: string
    professionalId: string
  }

  export type AppointmentUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutAppointmentsNestedInput
    professional?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    client?: ClientUpdateOneWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalServiceUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    professional?: UserUpdateOneRequiredWithoutServicesNestedInput
  }

  export type ProfessionalServiceUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentCreateManyProfessionalInput = {
    id?: string
    companyId: string
    clientName: string
    clientId?: string | null
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalServiceCreateManyProfessionalInput = {
    id?: string
    serviceId: string
  }

  export type AppointmentUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutAppointmentsNestedInput
    client?: ClientUpdateOneWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalServiceUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: ServiceUpdateOneRequiredWithoutProfessionalsNestedInput
  }

  export type ProfessionalServiceUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalServiceUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentCreateManyClientInput = {
    id?: string
    companyId: string
    professionalId: string
    clientName: string
    serviceId: string
    price?: number | null
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutAppointmentsNestedInput
    professional?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageTestimonialCreateManyCompanyPageInput = {
    id?: string
    authorName: string
    authorAvatar?: string | null
    rating?: number
    text: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageTestimonialUpdateWithoutCompanyPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageTestimonialUncheckedUpdateWithoutCompanyPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageTestimonialUncheckedUpdateManyWithoutCompanyPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManySubscriptionInput = {
    id?: string
    mpPaymentId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    mpPaymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}