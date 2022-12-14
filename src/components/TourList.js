import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from './Loading.js';

const TourList = () => {
  const location = useLocation().state;
  // let locationSearch = location ? location.search : "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState([]);
  const [targetPage, setTargetPage] = useState(1);
  const [recordScroll, setRecordScroll] = useState(location ? location.recordScroll : 0);

  const scrollPage = () => {
    document.addEventListener("scroll", () => {
      setRecordScroll(window.scrollY);
    });
    setTimeout(() => {
      window.scrollTo({ top: recordScroll });
    }, 50);
  }

  useEffect(() => {
    fetch(
      'https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c'
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const aryData = jsonData.data.XML_Head.Infos.Info;
        setData(aryData);
        if (!location) {
          setPage(
            new Array(Math.ceil(aryData.length / 20))
              .fill('')
              .map((_, i) => i + 1)
          );
          setLoading(false);
          scrollPage();
        } else {
          setPage(location.page);
          setSearch(location.search);
          setTargetPage(location.targetPage);
          // 清除 React Hooks
          window.history.replaceState({}, document.title);
          setLoading(false);
          scrollPage();
        }
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const dataFilterLen = data.filter((item) => {
      return item.Name.match(search);
    }).length;
    setPage(() =>
      new Array(Math.ceil(dataFilterLen / 20)).fill('').map((_, i) => i + 1)
    );
    // eslint-disable-next-line
  },[search]);

  return (
    <div className="container">
      {loading ? <Loading /> :
        <>
          <div className="form-floating m-3">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => {
                if (!search) {
                  return;
                }
                setSearch('');
                setTargetPage(1);
              }}
            >
              X
            </button>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setTargetPage(1);
              }}
            />
            <label
              htmlFor="search"
              style={{ display: 'block', textAlign: 'left' }}
            >
              Search
            </label>
          </div>
        <div className="row">
            {data
              .filter((item, i) => {
                if (search === '') {
                  return true;
                } else {
                  return item.Name.match(search);
                }
              })
              .filter((item, i) => {
                return Math.ceil((i + 1) / 20) === targetPage;
              })
              .map((item, i) => {
                return (
                  <div key={i} className="col-md-6 py-2">
                    <div className="card card-img-radius" title={item.Name}>
                      <Link
                        to={`/tour/${item.Id}`}
                        state={{
                          search: search,
                          page: page,
                          targetPage: targetPage,
                          recordScroll: recordScroll
                        }}
                      >
                        <div className="card bg-black card-img-radius">
                          <img
                            src={item.Picture1}
                            className="card-img-top img-cover card-img-radius"
                            height="200px"
                            alt={item.Name}
                          />
                        </div>
                        <div className="card-img-overlay d-flex flex-column justify-content-around tourCard-img card-img-radius">
                          <h4>{item.Name}</h4>
                          <h6>[◉"] - {item.Picdescribe1} - [◉"]</h6>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
          }
        </div>
        <ul className="pagination justify-content-center my-4">
          <li
            className={targetPage === 1 ? 'disabled' : ''}
            onClick={() => {
              if (targetPage === 1) {
                return;
              } else {
                setTargetPage(targetPage - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <a className="page-link" href="#/tour">
              &lt;
            </a>
          </li>
            {page.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={`d-none d-md-block
                    ${item === targetPage ? 'active' : ''}`}
                    onClick={() => {
                      if (item === targetPage){
                        return;
                      }else{
                        setTargetPage(item);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    <a className="page-link" href="#/tour">
                      {item}
                    </a>
                  </li>
                );
              })}
            {page.filter((item, i) => {
                  return item === targetPage;
                })
                .map((item, i) => {
                  return (
                    <li key={i} className="d-block d-md-none" disabled>
                      <a className="page-link" href="#/tour">
                        {item}
                      </a>
                    </li>
                  );
                })}
          <li
            className={targetPage === page.length ? 'disabled' : ''}
            onClick={() => {
              if (targetPage === page.length) {
                return;
              } else {
                setTargetPage(targetPage + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <a className="page-link" href="#/tour">
              &gt;
            </a>
          </li>
        </ul>
      </>
      }
    </div>
  );
}

export default TourList;