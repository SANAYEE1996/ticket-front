import { BASE_URL } from "../../shared/config";

export const ErrorPage = () => {
  //   const navigate = useNavigate();
  return (
    <div className="container">
      <section>
        <div className="van-application">
          <div className="title title-col">
            <img
              src={`${BASE_URL}/assets/images/error-img.png`}
              alt="오류 이미지"
              style={{ width: "200px" }}
            />
            <h3>오류가 발생했습니다.</h3>
            <p className="title-desc text-center">
              관리자에게 문의하여 주세요.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              window.location.href = BASE_URL || "/";
            }}
          >
            홈 화면으로 가기
          </button>
        </div>
      </section>
    </div>
  );
};
