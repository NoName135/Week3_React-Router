import {useState, useEffect} from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import Loading from './Loading.js';

const TourDetail = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation().state;
  const search = location ? location.search : null;
  const page = location ? location.page : null;
  const targetPage = location ? location.targetPage : null;
  const recordScroll = location ? location.recordScroll : null;

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
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <div className="row  justify-content-center">
          <div className="card col-8 mt-3 align-items-center">
            <div className="card-title">
              <h2 className="py-3">{data.Name}</h2>
              <img src={data.Picture1} alt={data.Name} className="card-img-top" />
            </div>
            <div className="card-body">
              <div
                className="card-content mt-3"
                style={{ display: 'block', textAlign: 'left' }}
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
      )}
      {location ? (
        <Link
          to={`/tour`}
          state={{ search: search, page: page, targetPage: targetPage, recordScroll: recordScroll }}
        >
          <button type="button" className="btn btn-success text-white my-3">
            回列表
          </button>
        </Link>
      ) : (
        <Link
          to={`/tour`}
        >
          <button type="button" className="btn btn-success text-white my-3">
            回列表
          </button>
        </Link>
      )}
    </div>
  );

};

export default TourDetail;
