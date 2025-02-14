import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deployERC20, deployERC721 } from "@/lib/contracts";

const erc20Schema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  initialSupply: z.string().min(1)
});

const erc721Schema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  baseURI: z.string().url()
});

export default function TokenDeployment() {
  const { toast } = useToast();
  const [deploying, setDeploying] = useState(false);

  const erc20Form = useForm<z.infer<typeof erc20Schema>>({
    resolver: zodResolver(erc20Schema)
  });

  const erc721Form = useForm<z.infer<typeof erc721Schema>>({
    resolver: zodResolver(erc721Schema)
  });

  const onDeployERC20 = async (data: z.infer<typeof erc20Schema>) => {
    try {
      setDeploying(true);
      const tx = await deployERC20(data);
      toast({
        title: "Success",
        description: `Token deployed at ${tx.contractAddress}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy token",
        variant: "destructive"
      });
    } finally {
      setDeploying(false);
    }
  };

  const onDeployERC721 = async (data: z.infer<typeof erc721Schema>) => {
    try {
      setDeploying(true);
      const tx = await deployERC721(data);
      toast({
        title: "Success",
        description: `NFT Collection deployed at ${tx.contractAddress}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy collection",
        variant: "destructive"
      });
    } finally {
      setDeploying(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <Tabs defaultValue="erc20">
          <TabsList className="mb-4">
            <TabsTrigger value="erc20">ERC20 Token</TabsTrigger>
            <TabsTrigger value="erc721">NFT Collection</TabsTrigger>
          </TabsList>

          <TabsContent value="erc20">
            <Form {...erc20Form}>
              <form onSubmit={erc20Form.handleSubmit(onDeployERC20)} className="space-y-4">
                <FormField
                  control={erc20Form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="My Token" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={erc20Form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Symbol</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="MTK" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={erc20Form.control}
                  name="initialSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Supply</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="1000000" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={deploying}
                  className="w-full bg-orange-400 hover:bg-orange-500"
                >
                  Deploy Token
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="erc721">
            <Form {...erc721Form}>
              <form onSubmit={erc721Form.handleSubmit(onDeployERC721)} className="space-y-4">
                <FormField
                  control={erc721Form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="My NFTs" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={erc721Form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection Symbol</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="MNFT" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={erc721Form.control}
                  name="baseURI"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base URI</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://api.example.com/metadata/" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={deploying}
                  className="w-full bg-orange-400 hover:bg-orange-500"
                >
                  Deploy Collection
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
