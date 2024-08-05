import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

function App() {
  return (
    <Tabs variant='enclosed' isFitted>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>)
}

export default App
