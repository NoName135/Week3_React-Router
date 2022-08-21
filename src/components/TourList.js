import {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';


const TourList = () => {
  const location = useLocation().state;
  let locationSearch = location ? location.search : "";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(locationSearch);
  const [page, setPage] = useState([]);
  const [targetPage, setTargetPage] = useState(1);
  const [firstRender, setFirstRender] = useState(true);

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
        } else {
          setPage(location.page);
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
    if (!location || !firstRender) {
      setTargetPage(1);
    } else {
      setTargetPage(location.targetPage);
      setFirstRender(false);
    }
    // eslint-disable-next-line
  },[search]);

  return (
    <div className="container">
      <div className="form-floating m-3">
        <button type="button" className="btn btn-outline-secondary btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
          onClick={() => {
            setSearch("")
            setTargetPage(1)
          }}>X</button>
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <label for="search" style={{display: "block", "text-align": "left"}}>Search</label>
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
                <div className="card">
                  <Link
                    to={`/tour/${item.Id}`}
                    state={{
                      search: search,
                      page: page,
                      targetPage: targetPage,
                    }}
                  >
                    <div className="card bg-black">
                      <img
                        src={item.Picture1}
                        className="card-img-top img-cover"
                        height="155px"
                        alt={item.Name}
                      />
                    </div>
                    <div className="card-img-overlay d-flex flex-column justify-content-around tourCard-img">
                      <h4>{item.Name}</h4>
                      <h6>[◉"]　{item.Picdescribe1}　[◉"]</h6>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      <ul class="pagination justify-content-center my-4">
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
              className="d-none d-md-block {item === targetPage ? 'active' : ''}"
              onClick={() => {
                setTargetPage(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <a className="page-link" href="#/tour">
                {item}
              </a>
            </li>
          );
        })}
        {page
        .filter((item, i) => {
            return item === targetPage
        })
        .map((item, i) => {
          return (
            <li key={i} className="d-block d-md-none">
              <a className="page-link" disabled href={() => false}>
                {item}
              </a>
            </li>
          );
        })
        }
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
    </div>
  );
}

export default TourList;