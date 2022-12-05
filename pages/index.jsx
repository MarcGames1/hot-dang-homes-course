import client from 'client'
import { gql } from '@apollo/client';
import { BlockRenderer } from 'components/BlockRenderer';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';
export const getStaticProps = async () =>{
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocksJSON
            title
          }
        }
      }
    `,
  });
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON)
  return {
    props:{
      blocks,

    }
  }
}
 

export default function Home(props) {
  console.log(props)
  return <div><BlockRenderer blocks={props.blocks} /></div>;
}
