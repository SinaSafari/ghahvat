import axios from "axios";

export type ZarinpalPaymentRequestPayload = {
  amount: number;
  description: string;
  metadata?: {
    mobile?: string;
    order_id?: string;
    email?: string;
  };
  merchant_id: string;
  currency: "IRR" | "IRT";
  callback_url: string;
};

export type ZarinpalPaymentRequestResponse = {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type: string;
    fee: number;
  };
  errors: Array<any>;
};

export type ZarinpalVerifyTransactionPayload = {
  amount: number;
  merchant_id: string;
  authority: string;
};

export type ZarinpalVerifyTransactionResponse = {
  data: {
    code: number;
    message: string;
    card_hash: string;
    card_pan: string;
    ref_id: number;
    fee_type: string;
    fee: number;
  };
  errors: Array<any>;
};

export type ZarinpalPaymentRequestParams = Omit<
  ZarinpalPaymentRequestPayload,
  "merchant_id" | "currency" | "callback_url"
>;
export type ZarinpalVerifyTransactionParams = Omit<
  ZarinpalVerifyTransactionPayload,
  "merchant_id"
>;

const zarinpalAxios = axios.create({
  baseURL: "https://api.zarinpal.com",
  validateStatus: (status) => status < 600,
});

const merchant_id = process.env.ZARINPAL_MERCHANT_ID as string;
const callbackUrl = `${process.env.HOST}/payment/cb`;
const currency = "IRT";

export async function initialPaymentRequest(
  payload: ZarinpalPaymentRequestParams
) {
  const payloadData: ZarinpalPaymentRequestPayload = {
    metadata: {
      mobile: payload.metadata?.mobile,
      order_id: payload.metadata?.order_id,
      email: payload.metadata?.email,
    },
    amount: payload.amount,
    currency: currency,
    description: payload.description,
    merchant_id: merchant_id,
    callback_url: callbackUrl,
  };
  const {
    data: { data, errors },
  } = await zarinpalAxios.post<ZarinpalPaymentRequestResponse>(
    "/pg/v4/payment/request.json",
    payloadData
  );
  return {
    success: data.code === 100,
    redirectUrl: `https://www.zarinpal.com/pg/StartPay/${data.authority}`,
    data,
    errors,
  };
}

export async function verifyTransaction(
  payload: ZarinpalVerifyTransactionParams
) {
  const payloadData: ZarinpalVerifyTransactionPayload = {
    merchant_id: merchant_id,
    amount: payload.amount,
    authority: payload.authority,
  };
  const {
    data: { data, errors },
  } = await zarinpalAxios.post<ZarinpalVerifyTransactionResponse>(
    "/pg/v4/payment/verify.json",
    payloadData
  );
  return {
    success: data.code === 100 || data.code === 101,
    data,
    errors,
  };
}
