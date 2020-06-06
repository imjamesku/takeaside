import React from "react";
import Layout from "../../src/components/Layout/Layout";
import useSWR from "swr";
import { UserResourceWithTopics } from "../../src/_types/UserResource";
import axios from "../../src/_helpers/axios";
import { useRouter } from "next/router";
import TopicEssentialList from "../../src/components/TopicEssentialList/TopicEssentialList";
import styles from "./[id].module.scss";

type Props = {};

const UserDetailPage = ({}: Props) => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return (
      <Layout>
        <h1>Loading</h1>
      </Layout>
    );
  }
  const fetcher = (key: string) => axios.get(key).then((res) => res.data);
  const { data, error } = useSWR<UserResourceWithTopics>(
    `/users/${id}`,
    fetcher
  );

  if (error) {
    return (
      <Layout title={`Error`}>
        <p>
          <span style={{ color: "red" }}>Error:</span> {error}
        </p>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <h1>Loading</h1>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        data ? `Topics created by ${data.username}` : "User Detail"
      } | imbiased`}
    >
      <h1 className={styles.title}>@{data.username}</h1>
      <h2 className={styles.sectionTitle}>Topics</h2>
      <TopicEssentialList topics={data.topics} />
    </Layout>
  );
};

export default UserDetailPage;
