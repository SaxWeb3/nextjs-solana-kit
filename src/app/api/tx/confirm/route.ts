import { NETWORK } from "@/utils/endpoints";
import { Connection } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export type TxConfirmData = {
  confirmed: boolean;
  message: string;
};

export async function POST(req: NextRequest, res: NextResponse<TxConfirmData>) {
  const body = await req.json();

  const { txSignature } = body;

  const connection = new Connection(NETWORK);

  const latestBlockhash = await connection.getLatestBlockhash("finalized");

  try {
    const confirmation = await connection.confirmTransaction({
      signature: txSignature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      return NextResponse.json(
        { confirmed: false, message: "Transaction not confirmed" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { confirmed: true, message: "Transaction confirmed" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      confirmed: false,
      message: "Transaction not confirmed",
    });
  }
}
