import Button from "../../components/button";
import LabelTitle from "../../components/label-title";
import MainLayout from "../../components/layouts/main-layout";

const UserEdit = () => {
  return (
    <MainLayout pageTitle="프로필 수정" hasFooter={true}>
      <div className="wrapper without-header-footer">
        <div className="content-sub flex items-center">
          <form className="flex flex-col w-full">
            <label className="transition-all rounded-full flex justify-center items-center cursor-pointer">
              <img
                src={true ? "/images/basic_user.png" : "https://newsimg.sedaily.com/2022/02/21/26288ZY0E1_3.jpg"}
                alt=""
                className="border border-gray-200 rounded-full w-56 h-56"
              />
              <input type="file" required accept="image/*" className="hidden" />
            </label>
            <label className="mt-4">
              <LabelTitle text="유저 이름" />
              <input type="text" placeholder="유저 이름을 입력해주세요." className="input ring-normal" />
            </label>
            <label className="mt-4">
              <LabelTitle text="이메일" />
              <input type="email" placeholder="이메일을 입력해주세요." required className="input ring-normal" />
            </label>
            <label className="mt-4 mb-4">
              <LabelTitle text="휴대폰 번호" />
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-300 select-none">+82</span>
                <input type="number" placeholder="휴대폰 번호를 입력해주세요." required className="input-space pl-12 pr-2 ring-normal" />
              </div>
            </label>
            <Button type="submit" text="프로필 업데이트" size="w-full" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserEdit;
