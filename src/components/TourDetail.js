import {useState, useEffect} from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';

const TourDetail = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const search = useLocation().state.search;
  const page = useLocation().state.page;
  const targetPage = useLocation().state.targetPage;

  useEffect(() => {
    fetch(
      'https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c'
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const aryData = jsonData.data.XML_Head.Infos.Info;
        const selectData = aryData.filter((item, i) => {
          return item.Id === Id;
        });
        setData(selectData[0]);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row  justify-content-center">
        <div className="card col-8 mt-3 align-items-center">
          <div className="card-title">
            <h2 className="py-3">{data.Name}</h2>
            <img src={data.Picture1} alt={data.Name} class="card-img-top" />
          </div>
          <div className="card-body">
            <div
              className="card-content mt-3"
              style={{ display: 'block', 'text-align': 'left' }}
            >
              <div>
                <p className="border-bottom border-secondary">
                  <b>地址：</b>
                  {data.Add}
                </p>
              </div>
              <div>
                <p className="border-bottom border-secondary">
                  <b>電話：</b>
                  {data.Tel}
                </p>
              </div>
              <div>
                <p className="border-bottom border-secondary">
                  <b>營業時間：</b>
                  {data.Opentime}
                </p>
              </div>
              <div>
                <p>{data.Description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        to={`/tour`}
        state={{ search: search, page: page, targetPage: targetPage }}
      >
        <button type="button" className="btn btn-success text-white my-3">
          回列表
        </button>
      </Link>
    </div>
  );

};

export default TourDetail;
