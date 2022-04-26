import Button from "../../components/button";
import LabelTitle from "../../components/label-title";
import MainLayout from "../../components/layouts/main-layout";

const StreamCreate = () => {
  return (
    <MainLayout pageTitle="스트림 시작" hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          <div className="flex flex-col justify-center items-center w-full my-6">
            <img src="/images/background_stream.png" alt="" className="w-full rounded-lg" />
            <form className="flex flex-col w-full">
              <label className="mt-5">
                <LabelTitle text="제목" />
                <input type="text" placeholder="스트리밍 제목을 작성해주세요." className="input ring-normal" maxLength={30} />
              </label>
              <label className="mt-5 mb-2">
                <LabelTitle text="설명" />
                <textarea rows={5} maxLength={200} placeholder="스트리밍 내용을 작성해주세요." className="resize-none input ring-normal" />
              </label>
              <Button type="submit" text="실시간 스트리밍 시작" size="w-full" />
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StreamCreate;
