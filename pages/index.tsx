import Link from 'next/link'
import Layout from '../components/Layout'
import { Topic } from '../types/Topics'
import TopicBox from '../components/TopicBox/TopicBox'

const IndexPage = () => {
  const dummyData: Topic[] = [
    {
      question: "Cat or dog?",
      firstOption: {
        name: "dog",
        users: ["james", "tide", "kevin"]
      },
      secondOption: {
        name: "cat",
        users: ["james", "tide", "kevin"]
      }
    },
    {
      question: "Cat or dog?",
      firstOption: {
        name: "dog",
        users: ["james", "tide", "kevin"]
      },
      secondOption: {
        name: "cat",
        users: ["james", "tide", "kevin"]
      }
    },
    {
      question: "Cat or dog?",
      firstOption: {
        name: "dog",
        users: ["james", "tide", "kevin"]
      },
      secondOption: {
        name: "cat",
        users: ["james", "tide", "kevin"]
      }
    }
  ]
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Which side is BETTER? 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
        {dummyData.map(topicData => <TopicBox {...topicData} />)}
      </p>
    </Layout>
  )
}

export default IndexPage
