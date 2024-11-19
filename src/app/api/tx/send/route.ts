import { NETWORK } from "@/utils/endpoints";
import { Connection, Transaction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export type TxSendData = {
  txSignature: string;
};

export async function POST(req: NextRequest, res: NextResponse<TxSendData>) {
  const body = await req.json();

  const { signedTx } = body;

  const connection = new Connection(NETWORK);
  const tx = Transaction.from(Buffer.from(signedTx, "base64"));

  const txSignature = await connection.sendRawTransaction(tx.serialize());

  return NextResponse.json(
    {
      txSignature,
    },
    { status: 200 }
  );
}
