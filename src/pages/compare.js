import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout_wide"
import Vote from "../components/vote"
import "twin.macro"
import MaterialTable from 'material-table';


const Compare = d => {
let tools = d.data.allToolsYaml.nodes;
  // tools = tools.filter(t =>t.children[0].sum >= 10)
  // tools = tools.sort();

  const [toolsFiltered, setToolsFiltered] = useState(tools)
  const [showProprietary, setShowProprietary] = useState(false)
  const filterTools = showProprietary => {
    setShowProprietary(!showProprietary)
    console.log(showProprietary)
    tools = tools.filter(t => {
      if (showProprietary) {
        return true
      } else {
        return t.license !== "proprietary"
      }
    })
    setToolsFiltered(tools)
  }

  const heading = ["Votes", "Tool", "Category", "Type", "Tags", "License"]
  heading.sort(function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  });


  const [filter, setFilter] = useState('');
  const handleChange = event => {
        setFilter()
        if(event.target.value){
          setToolsFiltered(tools.filter(tool => tool.toLowerCase().includes(filter.toLocaleLowerCase()
          )))
        }else {
          setToolsFiltered(tools)}
  };
  return (
    <Layout>
      <article tw="shadow w-full p-2 md:p-8">
        <h1 tw="text-3xl font-semibold pb-10">
          Compare {tools.length} Analysis Tools
        </h1>
        <div tw="p-8 bg-gray-300">
          <input
            onChange={() => filterTools(showProprietary)}
            type="checkbox"
            id="showproprietary"
            name="showproprietary"
            value="true"
          ></input>
          <label tw="ml-2" htmlFor="showproprietary">
            Hide proprietary tools
          </label>
        </div>
        <table tw="w-full overflow-x-auto block border">
          <thead>
            <tr tw="flex-auto">
              {heading.map((heading) => (
                <th key={heading} tw="sticky top-0 md:py-2 text-gray-900 bg-gray-100">{heading}</th>
                
              ))}
            </tr>
          
          { <div tw="flex-auto">
          <input
          type="text"
           placeholder="filter"
           value={filter}
           onChange={handleChange}
           />
         
        </div> }
          </thead>
        
           
          <tbody tw="divide-y">
            {toolsFiltered.map(tool => (
              <tr>
                <td tw="text-center md:py-2">{tool.categories.join(", ")}</td>
                <td tw="text-center md:py-2">{tool.license}</td>
                <td tw="text-center md:py-2">
                  <ul tw="list-none max-w-sm inline-block align-top">
                    {tool.tags &&
                      tool.tags.slice(0, 3).map(tag => (
                        <li
                          tw="mb-2 mr-1 inline-block"
                          key={`${tool.fields.slug}${tag}`}
                        >
                          <a href={"/tag/" + tag}>
                            <span tw="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded">
                              {tag}
                            </span>
                          </a>
                        </li>
                      ))}
                    {tool.tags.length > 3 && (
                      <a href={tool.fields.slug}>
                        <span tw="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded">
                          more...
                        </span>
                      </a>
                    )}
                  </ul>
                </td>
              
                <td tw="text-center md:py-2">{tool.types.join(", ")}</td>
                 
                <td tw="text-center md:py-2">
                  <Link to={tool.fields.slug} tw="underline">
                    {tool.name}
                  </Link>
                </td>
         
             

                <td tw="text-center px-6 py-2">
                  <Vote k={tool.children[0].key} sum={tool.children[0].sum} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </Layout>
  )
}

export const query = graphql`
  {
    allToolsYaml {
      nodes {
        categories
        deprecated
        discussion
        license
        name
        tags
        types
        fields {
          slug
          githubStats {
            stargazers_count
          }
        }
        children {
          ... on Votes {
            sum
            downVotes
            upVotes
            key
          }
        }
      }
    }
  }
`
export default Compare