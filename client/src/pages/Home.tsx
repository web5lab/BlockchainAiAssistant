import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/Chat";
import TokenDeployment from "@/components/TokenDeployment";
import WalletConnect from "@/components/WalletConnect";
import NetworkSelector from "@/components/NetworkSelector";
import { RiRobot2Line } from "react-icons/ri";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <RiRobot2Line className="w-12 h-12 text-orange-400 animate-bounce" />
          <h1 className="text-3xl font-bold text-orange-700">Blockchain AI Assistant</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <Card className="shadow-lg">
              <CardContent className="p-4 space-y-4">
                <WalletConnect />
                <NetworkSelector />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-9">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="chat" className="text-lg">AI Chat</TabsTrigger>
                <TabsTrigger value="deploy" className="text-lg">Deploy Tokens</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <Chat />
              </TabsContent>
              
              <TabsContent value="deploy">
                <TokenDeployment />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
