import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalUsers = await prisma.user.count({
      where: { role: "USER" },
    });

    const totalRecords = await prisma.bmiRecord.count();

    const records = await prisma.bmiRecord.findMany({
      select: {
        bmi: true,
        category: true,
      },
    });

    const averageBMI =
      records.length > 0
        ? records.reduce((acc: number, curr) => acc + curr.bmi, 0) / records.length
        : 0;

    const categoryDistribution = records.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      totalUsers,
      totalRecords,
      averageBMI: parseFloat(averageBMI.toFixed(2)),
      categoryDistribution,
    });
  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
