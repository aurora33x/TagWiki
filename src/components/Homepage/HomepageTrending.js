import { Card, Carousel, Col, Layout, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scroll01 from "../../assets/homepage/trending1.jpg";
import scroll02 from "../../assets/homepage/trending2.jpg";
import scroll03 from "../../assets/homepage/trending3.png";
import './HomepageTrending.css';


const { Content } = Layout;
const { Meta } = Card;

function HomepageTrending(props) {

  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);
  const [list, setList] = useState([]);
  const [init, setInit] = useState(0);

  const [title1, setTitle01] = useState();
  const [descrip1, setDescrip01] = useState();
  const scrollID01 = "668146b8cad7075920c5a8c2";

  const [title2, setTitle02] = useState();
  const [descrip2, setDescrip02] = useState();
  const scrollID02 = "66814775cad7075920c5a8f3";

  const [title3, setTitle03] = useState();
  const [descrip3, setDescrip03] = useState();
  const scrollID03 = "668147facad7075920c5a908";
  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;

  const fetchData = (type) => {
    axios.get(`${base_url}/api/comment/commentMsg`, {}, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          const bannerRes = res.data.data.filter((item, index) => index <= 2);
          if (type === 'banner') setBanner(bannerRes);
          if (type === 'list') setList(bannerRes);

          if (res.data.data.map(x => x._id).includes(scrollID01)) {
            const index01 = res.data.data.findIndex(article => {
              return article._id === scrollID01;
            });
            const title01 = res.data.data[index01].title;
            setTitle01(title01);
            const descrip01 = res.data.data[index01].body;
            setDescrip01(descrip01);
          }
          if (res.data.data.map(x => x._id).includes(scrollID02)) {
            const index02 = res.data.data.findIndex(article => {
              return article._id === scrollID02;
            });
            const title02 = res.data.data[index02].title;
            setTitle02(title02);
            const descrip02 = res.data.data[index02].body;
            setDescrip02(descrip02);
          }
          if (res.data.data.map(x => x._id).includes(scrollID03)) {
            const index03 = res.data.data.findIndex(article => {
              return article._id === scrollID03;
            });
            const title03 = res.data.data[index03].title;
            setTitle03(title03);
            const descrip03 = res.data.data[index03].body;
            setDescrip03(descrip03);
          }
        } else {
          message.error('get comment api returns error')
        }
      })
      .catch(error => {
        message.error('Internet error')
      });
  }

  useEffect(() => {
    fetchData('banner');
    fetchData('list');
  }, [init])

  useEffect(() => {
    if (props.init !== init) {
      setInit(props.init);
    }
  }, [
    props.init,
  ])

  return (
    <Content className="content">
      <Row className="trending-panel" gutter={[24, 24]}>
        <Col xs={{ span: 24 }} sm={{ span: 9 }}>
          <Carousel autoplay className="scrollPanel">
            <img src={scroll01} onClick={() => {
              navigate('/detail?id=' + scrollID01);
            }} alt="scroll01" />
            <img src={scroll02} onClick={() => {
              navigate('/detail?id=' + scrollID02);
            }} alt="scroll02" />
            <img src={scroll03} onClick={() => {
              navigate('/detail?id=' + scrollID03);
            }} alt="scroll03" />
          </Carousel>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 5 }}>
          <a>
            <Card
              className="trending-card"
              hoverable
              onClick={() => {
                navigate('/detail?id=' + scrollID01);
              }}
              cover={
                <img alt="trending1" src={scroll01} />
              }
            >
              <Meta
                title={title1}
                description={descrip1}
              />
            </Card>
          </a>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 5 }}>
          <a>
            <Card
              className="trending-card"
              hoverable
              onClick={() => {
                navigate('/detail?id=' + scrollID02);
              }}
              cover={
                <img alt="trending1" src={scroll02} />
              }
            >
              <Meta
                title={title2}
                description={descrip2}
              />
            </Card>
          </a>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 5 }}>
          <a>
            <Card
              className="trending-card"
              hoverable
              onClick={() => {
                navigate('/detail?id=' + scrollID03);
              }}
              cover={
                <img alt="trending1" src={scroll03} />
              }
            >
              <Meta
                title={title3}
                description={descrip3}
              />
            </Card>
          </a>
        </Col>
      </Row>
    </Content>
  );
}

export default HomepageTrending;
