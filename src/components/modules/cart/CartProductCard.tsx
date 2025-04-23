import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function CartProductCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Image alt="product img" src="" />
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
