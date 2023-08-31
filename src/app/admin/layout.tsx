import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-72 h-full bg-black text-white border-l-8 border-primary px-3 py-5">
        <div className="flex flex-col items-stretch justify-between h-full">
          <div className="h-14 grid place-items-center">
            <div className="w-full h-full rounded bg-primary grid place-items-center mb-4">
              <p className="text-black text-lg font-bold">قهوه‌ت با من!</p>
            </div>
          </div>
          <div className="w-full flex-1 overflow-y-scroll">
            <div className="mb-12">
              <h2 className="menu-title text-white text-lg">کلاینتی ها</h2>
              <ul className="menu bg-gray-900  rounded-box">
                <li>
                  <ul>
                    <li className="mb-3">
                      <Link href={"/admin/users"}>کاربرها</Link>
                    </li>
                    <li className="mb-3">
                      <Link href={"/admin/profiles"}>پروفایل‌ها</Link>
                    </li>
                    <li className="mb-3">
                      <Link href={"/admin/vendors"}>فروشگاه‌ها</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="menu-title text-white text-lg">تنظیمات</h2>
              <ul className="menu bg-gray-900  rounded-box">
                <li>
                  <ul>
                    <li className="mb-3">
                      <Link href={"/admin/admins"}>ادمین‌ها</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-10 grid place-items-center">
            <button className="btn btn-primary w-full">خروج</button>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full h-full p-2">{children}</div>
    </div>
  );
}
