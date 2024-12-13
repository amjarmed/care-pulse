"use client";
import Image from "next/image";

interface AdminBadgeProps {
  adminName: string;
  adminImage?: string;
}

const AdminBadge = ({ adminName, adminImage }: AdminBadgeProps) => {
  const { name, image } = {
    name: adminName,
    image:
      adminImage ??
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  return (
    <div className="flex items-center gap-3 select-none ">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="size-12 rounded-full bg-white p-[0.25px] shadow-sm"
      />
      <div>
        <p className="whitespace-nowrap ">{name}</p>
        <span className="text-xs tracking-widest opacity-60">Admin</span>
        <span className="">  </span>
      </div>
    </div>
  );
};

export default AdminBadge;
