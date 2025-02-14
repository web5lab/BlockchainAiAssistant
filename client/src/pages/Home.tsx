import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/Chat";
import TokenDeployment from "@/components/TokenDeployment";
import WalletConnect from "@/components/WalletConnect";
import NetworkSelector from "@/components/NetworkSelector";
import { RiRobot2Line } from "react-icons/ri";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-200/20 blur-3xl -top-48 -right-48 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-orange-300/20 blur-2xl -bottom-24 -left-24 animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="relative">
            <RiRobot2Line className="w-16 h-16 text-orange-400 animate-bounce" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Blockchain AI Assistant
            </h1>
            <p className="text-orange-600/60 mt-1">Your smart companion for blockchain development</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            className="md:col-span-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-white/70 border-orange-100 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6 space-y-6">
                <WalletConnect />
                <NetworkSelector />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="md:col-span-9"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="backdrop-blur-xl bg-white/70 border-orange-100 shadow-xl">
              <CardContent className="p-6">
                <Tabs defaultValue="chat" className="w-full">
                  <TabsList className="w-full justify-start mb-6 bg-orange-50/50">
                    <TabsTrigger 
                      value="chat" 
                      className="text-lg data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
                    >
                      AI Chat
                    </TabsTrigger>
                    <TabsTrigger 
                      value="deploy" 
                      className="text-lg data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
                    >
                      Deploy Tokens
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="chat">
                    <Chat />
                  </TabsContent>

                  <TabsContent value="deploy">
                    <TokenDeployment />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}