import client from 'client'
import { gql } from '@apollo/client';
import { BlockRenderer } from 'components/BlockRenderer';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';
import { mapMainMenuItems } from 'utils/mapMainMenuItems';
import { MainMenu } from 'components/MainMenu';
export const getStaticProps = async () =>{

  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocksJSON
            title
          }
        }

        acfOptionsMainMenu {
          mainMenu {
            menuItems {
              menuItems {
                menuItem {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
                submenuitems {
                  submenudestination {
                    ... on Page {
                      uri
                    }
                  }
                  submenulabel
                }
              }
            }
          }
        }
      }
    `,
  });

  console.log(data.acfOptionsMainMenu.mainMenu.menuItems.menuItems);
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON)
  return {
    props: {
      mainMenuItems:
        mapMainMenuItems(
          data.acfOptionsMainMenu.mainMenu.menuItems.menuItems
        ) || null,
      blocks,
    },
  };
}
 

export default function Home(props) {
  console.log(props)
  return <div>
    <MainMenu items={props.mainMenuItems} />
    <BlockRenderer blocks={props.blocks} />
    </div>;
}
