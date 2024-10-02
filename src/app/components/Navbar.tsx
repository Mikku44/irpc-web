import Button from "antd/es/button/button";
import { Send } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full bg-white text-center flex justify-between p-2 px-10 items-center">
      <div>
        <Image height={32} width={142} src="/images/irpc-logo.svg" alt="irpc logo" />
      </div>
      <div className="flex gap-2">
        <Button type="default" className="">
          <Send className="size-5" />
          <div className="">ร้องเรียน</div>
        </Button>
        <Button type="primary" className="">
          เข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
}
