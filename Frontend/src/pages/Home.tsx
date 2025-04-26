import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WalletConnectButton from '@/components/common/WalletConnectButton';
import BlockchainAnimation from '@/components/common/BlockchainAnimation';
import { useWeb3 } from '@/contexts/Web3Context';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Users, Clock, ArrowRight, CheckCircle, FileBadge } from 'lucide-react';

const Home = () => {
  const { isConnected } = useWeb3();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Secure Land Registry on the Blockchain
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Revolutionizing property ownership through transparent, secure, and efficient blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isConnected ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <WalletConnectButton size="lg" />
                )}
                <Button size="lg" variant="outline" asChild>
                  <Link to="/register">Learn More</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="order-first lg:order-last"
            >
              <BlockchainAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose LandChain?</h2>
            <p className="text-lg text-muted-foreground">
              Our blockchain-based land registry system offers unparalleled security, transparency, and efficiency.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Immutable Security</h3>
              <p className="text-muted-foreground">
                Once recorded, your property information cannot be altered, providing the highest level of security and trust.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Verification</h3>
              <p className="text-muted-foreground">
                Every step in the verification process is transparent and can be audited by all authorized parties.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Faster Processing</h3>
              <p className="text-muted-foreground">
                Reduce processing time from weeks to minutes with our streamlined blockchain-based verification system.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                <FileBadge className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Documentation</h3>
              <p className="text-muted-foreground">
                Store all your important property documents securely on the blockchain with cryptographic proof of ownership.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
              <p className="text-muted-foreground">
                Automated smart contracts ensure that property transfers and registrations follow all legal requirements.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reduced Fraud</h3>
              <p className="text-muted-foreground">
                Eliminate property fraud with cryptographic verification of ownership and transaction history.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined process makes land registration and transfers simple and secure.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border" />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-16"
            >
              {/* Step 1 */}
              <motion.div 
                variants={fadeIn}
                className="relative flex justify-between items-center"
              >
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold mb-2">Register</h3>
                  <p className="text-muted-foreground">
                    Submit your property details and supporting documentation through our secure platform.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground z-10">
                  1
                </div>
                <div className="w-5/12 pl-8">
                  <img 
                    src="https://images.pexels.com/photos/8297250/pexels-photo-8297250.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Property Registration" 
                    className="rounded-lg shadow-md w-full h-48 object-cover"
                  />
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                variants={fadeIn}
                className="relative flex justify-between items-center"
              >
                <div className="w-5/12 pr-8">
                  <img 
                    src="https://images.pexels.com/photos/7876528/pexels-photo-7876528.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Verification Process" 
                    className="rounded-lg shadow-md w-full h-48 object-cover"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground z-10">
                  2
                </div>
                <div className="w-5/12 pl-8 text-left">
                  <h3 className="text-xl font-bold mb-2">Verify</h3>
                  <p className="text-muted-foreground">
                    Our system validates your information and authorized officials verify the documentation.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                variants={fadeIn}
                className="relative flex justify-between items-center"
              >
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold mb-2">Own</h3>
                  <p className="text-muted-foreground">
                    Receive your blockchain-certified proof of ownership that's immutable and secure.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground z-10">
                  3
                </div>
                <div className="w-5/12 pl-8">
                  <img 
                    src="https://images.pexels.com/photos/6969809/pexels-photo-6969809.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Property Ownership" 
                    className="rounded-lg shadow-md w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Property?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of property owners who have already secured their land registry on the blockchain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isConnected ? (
                <Button size="lg" asChild>
                  <Link to="/register">Register Property</Link>
                </Button>
              ) : (
                <WalletConnectButton size="lg" />
              )}
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;