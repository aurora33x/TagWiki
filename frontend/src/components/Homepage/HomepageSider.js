import { ArrowRightOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Affix, Avatar, Button, Card, Collapse, List } from "antd";
import "antd/dist/antd.css";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import useJoinCommunity from '../Community/JoinCommunity';
import UserContext from "../UserContext";


const data = [
  { _id: "668144bdcad7075920c5a830", title: "Penguin", avatar: "/images/1.JPG" },
  { _id: "668144e3cad7075920c5a84e", title: "Lion", avatar: "/images/2.JPG" },
  { _id: "668144fccad7075920c5a85e", title: "Crocodile", avatar: "/images/3.JPG" },
  { _id: "66814513cad7075920c5a86e", title: "Cat", avatar: "/images/4.JPG" },
  { _id: "66814527cad7075920c5a87c", title: "Bear", avatar: "/images/5.JPG" },
];

function HomepageSider(props) {
  const user = useContext(UserContext);
  const joinCommunity = useJoinCommunity();
  return (
    <Affix>
      <div className="collapse">
        {user.userName && (
          <Button type="primary" style={{ width: 360 }} onClick={() => {
            props.handleOpen();
          }}>
            Create a post
          </Button>
        )}
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <div>
            <Card
              title="Our Communities"
              bordered={false}
              style={{ width: 360 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item actions={[<a type="primary" onClick={() => {
                    joinCommunity(item._id);
                  }}>Join</a>]}>
                    <List.Item.Meta
                      active
                      avatar={
                        <Avatar src={item.avatar} />
                      }
                      title={
                        <Link to={`/${item._id}`}>{item.title} </Link>}
                    >

                    </List.Item.Meta>
                  </List.Item>
                )}
              />
              <Link to="/communityList">
                {" "}
                Checkout All Communities <ArrowRightOutlined />{" "}
              </Link>
            </Card>
          </div>
        </Collapse>
      </div>
    </Affix>
  );
}
export default HomepageSider;
