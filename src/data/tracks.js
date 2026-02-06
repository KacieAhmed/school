export const tracks = [
  {
    id: "freshman",
    title: "Freshman",
    emoji: "\u{1F680}",
    description: "Start your Monad journey. Learn blockchain fundamentals, set up your environment, and write your first smart contract.",
    lessons: [
      {
        slug: "what-is-blockchain",
        title: "What is Blockchain?",
        readingTime: 5,
        content: [
          { type: "heading", text: "Introduction" },
          { type: "paragraph", text: "A blockchain is a shared digital ledger that records transactions across many computers. Because the data is distributed, no single party controls it and records cannot be changed after the fact." },
          { type: "paragraph", text: "Each block holds a batch of transactions and a reference to the block before it. This chain of references is what makes the ledger tamper-resistant." },
          { type: "heading", text: "Key Properties" },
          { type: "list", items: [
            "Decentralization — No single authority controls the network",
            "Immutability — Confirmed data cannot be altered",
            "Transparency — Anyone can verify the record",
            "Consensus — Participants agree on the current state"
          ]},
          { type: "paragraph", text: "Modern blockchains also support smart contracts — small programs that run on the network and execute automatically when conditions are met." }
        ],
        quiz: [
          { question: "What is a blockchain?", options: ["A centralized database", "A distributed ledger", "A cryptocurrency", "A programming language"], correctIndex: 1 },
          { question: "What links blocks together?", options: ["Database keys", "IP addresses", "Cryptographic hashes", "User accounts"], correctIndex: 2 },
          { question: "Which is NOT a property of blockchain?", options: ["Decentralization", "Immutability", "Central authority control", "Transparency"], correctIndex: 2 }
        ]
      },
      {
        slug: "intro-to-monad",
        title: "Introduction to Monad",
        readingTime: 5,
        content: [
          { type: "heading", text: "What is Monad?" },
          { type: "paragraph", text: "Monad is a high-performance Layer 1 blockchain that is fully compatible with Ethereum's tooling. It can run any Solidity smart contract without modification while processing transactions much faster." },
          { type: "paragraph", text: "The main innovation is parallel execution — Monad runs independent transactions at the same time instead of one by one." },
          { type: "heading", text: "Key Features" },
          { type: "list", items: [
            "Parallel execution for high throughput",
            "Full EVM compatibility",
            "Sub-second finality",
            "Low transaction costs"
          ]},
          { type: "paragraph", text: "Because Monad is EVM-compatible, developers can use familiar tools like Hardhat, Foundry, and MetaMask right away." }
        ],
        quiz: [
          { question: "What type of blockchain is Monad?", options: ["Layer 2 rollup", "High-performance Layer 1", "Sidechain", "State channel"], correctIndex: 1 },
          { question: "How does Monad achieve high throughput?", options: ["Sacrificing decentralization", "Parallel transaction execution", "Larger blocks only", "Off-chain computation"], correctIndex: 1 },
          { question: "Is Monad compatible with Ethereum contracts?", options: ["No", "Partially", "Yes, fully", "Only simple ones"], correctIndex: 2 }
        ]
      },
      {
        slug: "setting-up-wallet",
        title: "Setting Up Your Wallet",
        readingTime: 4,
        content: [
          { type: "heading", text: "Getting Started" },
          { type: "paragraph", text: "A crypto wallet stores your private keys and lets you sign transactions. Since Monad is EVM-compatible you can use wallets like MetaMask." },
          { type: "heading", text: "Setup Steps" },
          { type: "list", items: [
            "Install the MetaMask browser extension",
            "Create a new wallet and save your seed phrase securely",
            "Never share your seed phrase with anyone",
            "Add the Monad network using the RPC settings"
          ]},
          { type: "paragraph", text: "Your wallet address is safe to share — think of it like an account number. Your private key must stay secret." },
          { type: "code", text: "// Monad Network Configuration\nNetwork Name: Monad Testnet\nRPC URL: https://testnet.monad.xyz\nChain ID: 10143\nCurrency Symbol: MON" }
        ],
        quiz: [
          { question: "What does a wallet store?", options: ["Coins directly", "Private keys", "Blockchain data", "Smart contracts"], correctIndex: 1 },
          { question: "Which wallet works with Monad?", options: ["Bitcoin Core", "MetaMask", "Monad-specific only", "None yet"], correctIndex: 1 },
          { question: "What should you never share?", options: ["Wallet address", "Seed phrase", "Transaction history", "Network settings"], correctIndex: 1 }
        ]
      },
      {
        slug: "first-smart-contract",
        title: "Your First Smart Contract",
        readingTime: 6,
        content: [
          { type: "heading", text: "Writing Solidity" },
          { type: "paragraph", text: "Smart contracts are programs stored on the blockchain. On Monad you write them in Solidity, the same language used on Ethereum." },
          { type: "code", text: "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\n\ncontract SimpleStorage {\n    uint256 private storedValue;\n\n    function set(uint256 _value) public {\n        storedValue = _value;\n    }\n\n    function get() public view returns (uint256) {\n        return storedValue;\n    }\n}" },
          { type: "paragraph", text: "The set function writes data (costs gas), while get is a view function that reads data for free." },
          { type: "paragraph", text: "You deploy contracts using tools like Hardhat or Foundry. On Monad, transactions confirm in roughly one second." }
        ],
        quiz: [
          { question: "What language are Monad contracts written in?", options: ["JavaScript", "Rust", "Solidity", "Python"], correctIndex: 2 },
          { question: "What does a view function do?", options: ["Modifies state", "Reads without modifying state", "Deploys contracts", "Transfers tokens"], correctIndex: 1 },
          { question: "What happens when you call a state-changing function?", options: ["Nothing", "It's free", "Gas is consumed", "The contract redeploys"], correctIndex: 2 }
        ]
      },
      {
        slug: "gas-and-transactions",
        title: "Gas & Transactions",
        readingTime: 5,
        content: [
          { type: "heading", text: "Understanding Gas" },
          { type: "paragraph", text: "Gas measures the computational work needed to run operations on the blockchain. Every action in a smart contract costs some amount of gas." },
          { type: "list", items: [
            "Gas Limit — Maximum gas a transaction can use",
            "Gas Price — Cost per unit of gas",
            "Transaction Fee = Gas Used x Gas Price",
            "If a transaction runs out of gas it reverts, but the fee is still charged"
          ]},
          { type: "heading", text: "Transaction Lifecycle" },
          { type: "paragraph", text: "A transaction is created, signed, broadcast to the network, included in a block, executed, and finalized. On Monad this whole process takes about one second." },
          { type: "code", text: "// Transaction fields\n{\n  from: '0xYourAddress',\n  to: '0xContractAddress',\n  value: 0,\n  data: '0x...',\n  gasLimit: 21000\n}" }
        ],
        quiz: [
          { question: "What is gas?", options: ["A cryptocurrency", "A unit of computational effort", "A token type", "A consensus mechanism"], correctIndex: 1 },
          { question: "What if a transaction runs out of gas?", options: ["It completes", "It reverts but the fee is charged", "Gas is refunded", "Network crashes"], correctIndex: 1 },
          { question: "How is the fee calculated?", options: ["Fixed per transaction", "Gas Used x Gas Price", "Transaction size only", "Free for all"], correctIndex: 1 }
        ]
      }
    ]
  },
  {
    id: "sophomore",
    title: "Sophomore",
    emoji: "\u{1F4DA}",
    description: "Go deeper with Solidity, token standards, NFTs, DeFi basics, and Monad's parallel execution model.",
    lessons: [
      {
        slug: "solidity-deep-dive",
        title: "Solidity Deep Dive",
        readingTime: 7,
        content: [
          { type: "heading", text: "Going Deeper" },
          { type: "paragraph", text: "Solidity has three data locations: storage (on-chain, persistent), memory (temporary), and calldata (read-only input). Choosing correctly affects gas costs." },
          { type: "code", text: "contract UserRegistry {\n    struct User {\n        string name;\n        uint256 balance;\n        bool isActive;\n    }\n\n    mapping(address => User) public users;\n\n    function register(string calldata _name) external {\n        users[msg.sender] = User(_name, 0, true);\n    }\n}" },
          { type: "heading", text: "Modifiers and Inheritance" },
          { type: "paragraph", text: "Modifiers let you add reusable checks to functions. Inheritance lets one contract extend another. Both are key to writing clean code." },
          { type: "code", text: "contract Ownable {\n    address public owner;\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Not owner\");\n        _;\n    }\n    constructor() { owner = msg.sender; }\n}" }
        ],
        quiz: [
          { question: "Which data location is persistent?", options: ["memory", "calldata", "storage", "stack"], correctIndex: 2 },
          { question: "What is a modifier?", options: ["A data type", "A reusable function check", "A storage location", "A gas optimization"], correctIndex: 1 },
          { question: "What does msg.sender refer to?", options: ["Contract address", "Calling address", "Block miner", "Network ID"], correctIndex: 1 }
        ]
      },
      {
        slug: "erc20-tokens",
        title: "ERC-20 Tokens",
        readingTime: 6,
        content: [
          { type: "heading", text: "Fungible Tokens" },
          { type: "paragraph", text: "ERC-20 defines a standard interface for fungible tokens — tokens where every unit is identical, like a currency." },
          { type: "list", items: [
            "totalSupply() — Total token supply",
            "balanceOf(address) — Balance of an account",
            "transfer(to, amount) — Send tokens",
            "approve / transferFrom — Delegated transfers"
          ]},
          { type: "code", text: "contract MyToken {\n    string public name = \"My Token\";\n    uint8 public decimals = 18;\n    mapping(address => uint256) public balanceOf;\n\n    function transfer(address to, uint256 amount) external returns (bool) {\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n        return true;\n    }\n}" },
          { type: "paragraph", text: "On Monad, independent token transfers can execute in parallel, making them faster than on Ethereum." }
        ],
        quiz: [
          { question: "What token type does ERC-20 define?", options: ["Non-fungible", "Fungible", "Soulbound", "Governance only"], correctIndex: 1 },
          { question: "What does approve do?", options: ["Sends tokens", "Lets another address spend your tokens", "Creates tokens", "Burns tokens"], correctIndex: 1 },
          { question: "Standard ERC-20 decimals?", options: ["8", "6", "18", "0"], correctIndex: 2 }
        ]
      },
      {
        slug: "nfts-on-monad",
        title: "NFTs on Monad",
        readingTime: 5,
        content: [
          { type: "heading", text: "Non-Fungible Tokens" },
          { type: "paragraph", text: "Unlike ERC-20 tokens, each ERC-721 token (NFT) is unique. NFTs can represent art, collectibles, game items, and more." },
          { type: "code", text: "contract SimpleNFT {\n    uint256 private _nextId;\n    mapping(uint256 => address) public ownerOf;\n\n    function mint(address to) external {\n        ownerOf[_nextId] = to;\n        _nextId++;\n    }\n}" },
          { type: "paragraph", text: "Minting NFTs on Monad is cheaper and faster than on Ethereum. Metadata is usually stored off-chain on IPFS with just the URI kept on-chain." }
        ],
        quiz: [
          { question: "What makes an NFT different from ERC-20?", options: ["Cheaper", "Each one is unique", "Can't transfer", "No smart contracts"], correctIndex: 1 },
          { question: "Which standard defines NFTs?", options: ["ERC-20", "ERC-721", "ERC-1155", "ERC-777"], correctIndex: 1 },
          { question: "Where is NFT metadata usually stored?", options: ["Entirely on-chain", "Centralized database", "Off-chain with URI on-chain", "In the wallet"], correctIndex: 2 }
        ]
      },
      {
        slug: "defi-concepts",
        title: "DeFi Concepts",
        readingTime: 6,
        content: [
          { type: "heading", text: "Decentralized Finance" },
          { type: "paragraph", text: "DeFi replaces traditional financial intermediaries with smart contracts. Anyone with an internet connection can lend, borrow, or trade assets." },
          { type: "heading", text: "Core Primitives" },
          { type: "list", items: [
            "DEXs — Trade tokens using automated market makers",
            "Lending — Lend and borrow assets on-chain",
            "Stablecoins — Tokens pegged to real-world assets",
            "Yield Farming — Earn rewards by providing liquidity"
          ]},
          { type: "paragraph", text: "AMMs use liquidity pools and the formula x * y = k to enable instant swaps without a traditional order book." },
          { type: "paragraph", text: "Monad's speed lets DeFi apps offer an experience closer to centralized exchanges." }
        ],
        quiz: [
          { question: "What does DeFi stand for?", options: ["Defined Finance", "Decentralized Finance", "Digital Finance", "Distributed Finance"], correctIndex: 1 },
          { question: "What formula do constant-product AMMs use?", options: ["x + y = k", "x * y = k", "x / y = k", "x - y = k"], correctIndex: 1 },
          { question: "What is a flash loan?", options: ["A small loan", "Borrow and repay in one transaction", "A fast bank transfer", "A stablecoin"], correctIndex: 1 }
        ]
      },
      {
        slug: "monad-parallel-execution",
        title: "Monad Parallel Execution",
        readingTime: 6,
        content: [
          { type: "heading", text: "Parallel Execution" },
          { type: "paragraph", text: "Most blockchains process transactions one at a time. Monad identifies independent transactions and runs them simultaneously." },
          { type: "heading", text: "How It Works" },
          { type: "list", items: [
            "Identify independent transactions",
            "Execute them in parallel",
            "Check for conflicts",
            "Re-execute any that conflicted",
            "Commit the final state"
          ]},
          { type: "paragraph", text: "Monad also pipelines consensus and execution so the network is always doing useful work. Developers don't need to change their code — parallelization is handled automatically." },
          { type: "code", text: "// Can run in parallel:\n// TX1: Alice -> Bob\n// TX2: Charlie -> Dave\n\n// Cannot run in parallel:\n// TX1: Alice -> Bob\n// TX2: Bob -> Charlie  (depends on TX1)" }
        ],
        quiz: [
          { question: "How does Monad execute transactions?", options: ["Sequentially", "In parallel", "Off-chain", "One block at a time"], correctIndex: 1 },
          { question: "What happens when parallel transactions conflict?", options: ["Both cancelled", "Network halts", "They are re-executed", "Conflict ignored"], correctIndex: 2 },
          { question: "Do developers need to modify code for parallelization?", options: ["Yes, significantly", "Yes, minor changes", "No, it's automatic", "Only for DeFi"], correctIndex: 2 }
        ]
      }
    ]
  },
  {
    id: "junior",
    title: "Junior",
    emoji: "\u{1F6E0}\u{FE0F}",
    description: "Build real applications. Learn advanced patterns, construct a DEX, integrate oracles, audit for security, and explore cross-chain messaging.",
    lessons: [
      {
        slug: "advanced-solidity",
        title: "Advanced Solidity Patterns",
        readingTime: 7,
        content: [
          { type: "heading", text: "Production Patterns" },
          { type: "paragraph", text: "Production contracts use design patterns for upgradability, access control, and reentrancy protection." },
          { type: "code", text: "// Reentrancy Guard\ncontract ReentrancyGuard {\n    bool private _locked;\n    modifier nonReentrant() {\n        require(!_locked, \"Reentrant call\");\n        _locked = true;\n        _;\n        _locked = false;\n    }\n}" },
          { type: "heading", text: "Gas Optimization" },
          { type: "list", items: [
            "Pack storage variables into fewer slots",
            "Use calldata for read-only parameters",
            "Cache storage reads in memory",
            "Prefer mappings over arrays for large datasets"
          ]},
          { type: "paragraph", text: "The proxy pattern lets you upgrade contract logic after deployment by separating storage from implementation." }
        ],
        quiz: [
          { question: "What does the proxy pattern solve?", options: ["Gas costs", "Upgradability", "Token transfers", "Consensus"], correctIndex: 1 },
          { question: "What is a reentrancy attack?", options: ["DDoS", "Calling back before state updates", "Phishing", "Front-running"], correctIndex: 1 },
          { question: "Why use events over storage?", options: ["More secure", "Less gas", "Faster", "Required by ERC-20"], correctIndex: 1 }
        ]
      },
      {
        slug: "building-a-dex",
        title: "Building a DEX",
        readingTime: 8,
        content: [
          { type: "heading", text: "Decentralized Exchange" },
          { type: "paragraph", text: "A DEX lets users swap tokens without intermediaries using liquidity pools and the constant product formula." },
          { type: "code", text: "contract SimpleDEX {\n    uint256 public reserveA;\n    uint256 public reserveB;\n\n    function addLiquidity(uint256 a, uint256 b) external {\n        reserveA += a;\n        reserveB += b;\n    }\n\n    function getAmountOut(uint256 amountIn) public view returns (uint256) {\n        return (amountIn * reserveB) / (reserveA + amountIn);\n    }\n}" },
          { type: "paragraph", text: "Larger trades relative to the pool cause more price impact. Slippage tolerance lets users set a maximum acceptable price change." },
          { type: "paragraph", text: "Monad's fast confirmation times reduce the risk of price changes between when a trade is submitted and when it executes." }
        ],
        quiz: [
          { question: "What do liquidity providers receive?", options: ["Interest", "LP tokens", "Governance rights", "Nothing"], correctIndex: 1 },
          { question: "What causes price impact?", options: ["Congestion", "Trade size vs pool size", "Gas prices", "User count"], correctIndex: 1 },
          { question: "What is slippage protection?", options: ["Hack insurance", "Max acceptable price change", "Order book type", "Rug pull protection"], correctIndex: 1 }
        ]
      },
      {
        slug: "oracle-integration",
        title: "Oracle Integration",
        readingTime: 5,
        content: [
          { type: "heading", text: "Off-Chain Data" },
          { type: "paragraph", text: "Smart contracts can't access external data on their own. Oracles provide off-chain information — prices, randomness, real-world events — to contracts." },
          { type: "list", items: [
            "Price Feeds — Asset prices for DeFi",
            "VRF — Verifiable random numbers",
            "Proof of Reserve — Off-chain asset verification",
            "Custom Feeds — Any external data"
          ]},
          { type: "code", text: "interface IPriceFeed {\n    function latestAnswer() external view returns (int256);\n}\n\ncontract PriceConsumer {\n    IPriceFeed public feed;\n    function getPrice() public view returns (int256) {\n        return feed.latestAnswer();\n    }\n}" },
          { type: "paragraph", text: "Fast block times on Monad mean oracle data can be updated more frequently, reducing stale-data risk." }
        ],
        quiz: [
          { question: "Why do contracts need oracles?", options: ["Speed", "Off-chain data access", "More storage", "Upgrades"], correctIndex: 1 },
          { question: "What is a VRF?", options: ["Very Rapid Function", "Verifiable Random Function", "Virtual Routing Framework", "Variable Rate Feed"], correctIndex: 1 },
          { question: "Why are fast oracle updates important?", options: ["Less gas", "Prevent stale data", "More decentralization", "Not important"], correctIndex: 1 }
        ]
      },
      {
        slug: "security-and-auditing",
        title: "Security & Auditing",
        readingTime: 6,
        content: [
          { type: "heading", text: "Smart Contract Security" },
          { type: "paragraph", text: "Bugs in smart contracts can cause immediate, irreversible fund loss. Understanding common vulnerabilities is essential." },
          { type: "heading", text: "Common Vulnerabilities" },
          { type: "list", items: [
            "Reentrancy — External calls before state updates",
            "Access Control — Missing permission checks",
            "Front-Running — Exploiting pending transaction visibility",
            "Oracle Manipulation — Corrupting price data"
          ]},
          { type: "code", text: "// Checks-Effects-Interactions\nfunction withdraw(uint256 amount) external {\n    require(balances[msg.sender] >= amount); // Check\n    balances[msg.sender] -= amount;          // Effect\n    (bool ok, ) = msg.sender.call{value: amount}(\"\"); // Interaction\n    require(ok);\n}" },
          { type: "paragraph", text: "Always validate first, update state second, and make external calls last. Use audited libraries like OpenZeppelin whenever possible." }
        ],
        quiz: [
          { question: "What is Checks-Effects-Interactions?", options: ["UI pattern", "Validate, update state, then external calls", "Testing method", "Deployment strategy"], correctIndex: 1 },
          { question: "Which Solidity version mitigates overflow?", options: ["0.6", "0.7", "0.8+", "All"], correctIndex: 2 },
          { question: "Why multiple audits?", options: ["Cheaper in bulk", "Different auditors find different issues", "Regulation", "Marketing"], correctIndex: 1 }
        ]
      },
      {
        slug: "cross-chain-communication",
        title: "Cross-Chain Communication",
        readingTime: 5,
        content: [
          { type: "heading", text: "Bridging Chains" },
          { type: "paragraph", text: "Cross-chain communication lets assets and data move between blockchains. Monad's EVM compatibility makes bridging with other EVM chains straightforward." },
          { type: "list", items: [
            "Lock and Mint — Lock on chain A, mint wrapped on chain B",
            "Burn and Release — Burn wrapped tokens, release originals",
            "Message Passing — Send arbitrary data between chains"
          ]},
          { type: "code", text: "interface ICrossChainReceiver {\n    function receiveMessage(\n        uint256 sourceChainId,\n        address sender,\n        bytes calldata message\n    ) external;\n}" },
          { type: "paragraph", text: "Bridge security is critical — hacks have caused billions in losses. Always use well-audited protocols." }
        ],
        quiz: [
          { question: "How do bridges transfer assets?", options: ["Direct transfer", "Lock on source, mint on destination", "Copy tokens", "Central exchange"], correctIndex: 1 },
          { question: "What happens to wrapped tokens when bridging back?", options: ["Kept", "Burned", "Transferred", "Become NFTs"], correctIndex: 1 },
          { question: "Why is bridge security critical?", options: ["Bridges are slow", "Hacks have caused billions in losses", "Too much gas", "They're centralized"], correctIndex: 1 }
        ]
      }
    ]
  },
  {
    id: "senior",
    title: "Senior",
    emoji: "\u{1F393}",
    description: "Master Monad's internals, design high-performance dApps, understand MEV, explore the ecosystem, and tackle your capstone project.",
    lessons: [
      {
        slug: "monad-architecture-deep-dive",
        title: "Monad Architecture Deep Dive",
        readingTime: 7,
        content: [
          { type: "heading", text: "Under the Hood" },
          { type: "paragraph", text: "Monad rethinks every layer of the blockchain stack — consensus, execution, and storage — to achieve high performance while staying fully decentralized." },
          { type: "heading", text: "Key Components" },
          { type: "list", items: [
            "MonadBFT — Pipelined BFT consensus based on HotStuff",
            "MonadDb — Custom state database with async I/O",
            "Parallel Execution — Optimistic concurrency with conflict detection",
            "Deferred Execution — Consensus and execution run in a pipeline"
          ]},
          { type: "paragraph", text: "Together these innovations enable 10,000+ transactions per second with sub-second finality." }
        ],
        quiz: [
          { question: "What is MonadBFT based on?", options: ["Nakamoto consensus", "HotStuff BFT", "Tendermint", "PBFT"], correctIndex: 1 },
          { question: "What is MonadDb?", options: ["SQL database", "Custom state database", "Data indexer", "Oracle service"], correctIndex: 1 },
          { question: "What throughput can Monad achieve?", options: ["100 TPS", "1,000 TPS", "10,000+ TPS", "1 million TPS"], correctIndex: 2 }
        ]
      },
      {
        slug: "high-performance-dapp-design",
        title: "High-Performance dApp Design",
        readingTime: 6,
        content: [
          { type: "heading", text: "Designing for Speed" },
          { type: "paragraph", text: "Taking advantage of Monad's throughput requires thoughtful smart contract and frontend design." },
          { type: "list", items: [
            "Minimize shared state so transactions can run in parallel",
            "Use events for indexing rather than on-chain reads",
            "Batch operations to reduce transaction count",
            "Use WebSockets for real-time updates in the frontend"
          ]},
          { type: "code", text: "// Optimistic UI pattern\nasync function submit(txData) {\n  updateUI(txData, 'pending');\n  try {\n    const tx = await contract.execute(txData);\n    await tx.wait();\n    updateUI(txData, 'confirmed');\n  } catch {\n    updateUI(txData, 'failed');\n  }\n}" },
          { type: "paragraph", text: "With sub-second blocks, optimistic UI updates let users see changes almost instantly while the chain confirms." }
        ],
        quiz: [
          { question: "How should you design for parallel execution?", options: ["Maximize shared state", "Minimize shared state", "Sequential only", "Avoid events"], correctIndex: 1 },
          { question: "What is an optimistic UI update?", options: ["Slow loading", "Update before confirmation", "Show only confirmed data", "An animation"], correctIndex: 1 },
          { question: "What should you use for complex queries?", options: ["On-chain reads", "Event-driven indexers", "Centralized DB only", "Hardcoded data"], correctIndex: 1 }
        ]
      },
      {
        slug: "mev-on-monad",
        title: "MEV on Monad",
        readingTime: 6,
        content: [
          { type: "heading", text: "Maximal Extractable Value" },
          { type: "paragraph", text: "MEV is the profit that can be extracted by reordering or inserting transactions in a block. Understanding it helps you build safer applications." },
          { type: "heading", text: "Types of MEV" },
          { type: "list", items: [
            "Arbitrage — Price differences across DEXs",
            "Liquidations — Racing to liquidate positions",
            "Sandwich Attacks — Front- and back-running trades",
            "JIT Liquidity — Adding liquidity before a big trade"
          ]},
          { type: "paragraph", text: "Monad's fast finality reduces the window for reordering. Developers should still add slippage protection and deadline parameters." },
          { type: "code", text: "function swapWithProtection(\n    uint256 amountIn,\n    uint256 minAmountOut, // slippage protection\n    uint256 deadline\n) external {\n    require(block.timestamp <= deadline, \"Expired\");\n    uint256 out = dex.swap(amountIn);\n    require(out >= minAmountOut, \"Slippage\");\n}" }
        ],
        quiz: [
          { question: "What does MEV stand for?", options: ["Maximum Ethereum Value", "Maximal Extractable Value", "Minimum Exchange Value", "Market Expected Volume"], correctIndex: 1 },
          { question: "What is a sandwich attack?", options: ["Consensus attack", "Front- and back-running a trade", "Congestion attack", "Contract exploit"], correctIndex: 1 },
          { question: "How do users protect against sandwiches?", options: ["Larger trades", "Slippage tolerance", "Avoid DEXs", "Multiple wallets"], correctIndex: 1 }
        ]
      },
      {
        slug: "monad-ecosystem",
        title: "The Monad Ecosystem",
        readingTime: 5,
        content: [
          { type: "heading", text: "Ecosystem Overview" },
          { type: "paragraph", text: "Monad has a growing ecosystem of DeFi protocols, NFT projects, infrastructure providers, developer tools, and gaming applications." },
          { type: "list", items: [
            "DeFi — DEXs, lending, yield, stablecoins",
            "NFTs — Marketplaces and collections",
            "Infrastructure — Bridges, oracles, indexers",
            "Developer Tools — Hardhat, Foundry, Ethers.js all work",
            "Gaming and Social — On-chain games and social apps"
          ]},
          { type: "paragraph", text: "Standard Ethereum tools work out of the box, and the community offers documentation, tutorials, and grants for builders." }
        ],
        quiz: [
          { question: "What tools work on Monad?", options: ["Custom tools only", "Standard Ethereum tools", "Only Remix", "None yet"], correctIndex: 1 },
          { question: "What types of apps are in the ecosystem?", options: ["Only DeFi", "Only NFTs", "DeFi, NFTs, gaming, social, infra", "Only payments"], correctIndex: 2 },
          { question: "Why can Monad support new app types?", options: ["Lower security", "High throughput and fast finality", "Centralized infra", "Simpler contracts"], correctIndex: 1 }
        ]
      },
      {
        slug: "capstone-project",
        title: "Capstone Project",
        readingTime: 7,
        content: [
          { type: "heading", text: "Your Capstone" },
          { type: "paragraph", text: "Congratulations on reaching the final lesson. The capstone ties together everything you've learned by designing a full-stack DEX on Monad." },
          { type: "heading", text: "Architecture" },
          { type: "list", items: [
            "Smart Contracts — Pool factory, router, LP token",
            "Frontend — Wallet connection, swap UI, pool management",
            "Indexer — Event-based trade history and analytics",
            "Testing — Comprehensive test suite"
          ]},
          { type: "code", text: "interface IRouter {\n    function swap(\n        uint256 amountIn,\n        uint256 amountOutMin,\n        address[] calldata path,\n        address to,\n        uint256 deadline\n    ) external returns (uint256[] memory amounts);\n}" },
          { type: "heading", text: "Design Questions" },
          { type: "list", items: [
            "How will pools minimize state conflicts?",
            "What MEV protections will you add?",
            "How will the frontend handle fast block updates?",
            "What oracle will you use for prices?"
          ]},
          { type: "paragraph", text: "You now have the knowledge to build production applications on Monad. Good luck!" }
        ],
        quiz: [
          { question: "What makes up a full DEX?", options: ["Just contracts", "Contracts, frontend, indexer, tests", "Only frontend", "Only a database"], correctIndex: 1 },
          { question: "Why is a router contract important?", options: ["Stores tokens", "Handles multi-hop routing", "Manages accounts", "Replaces frontend"], correctIndex: 1 },
          { question: "What should you optimize for on Monad?", options: ["Sequential transactions", "Minimal state conflicts", "Off-chain only", "No smart contracts"], correctIndex: 1 }
        ]
      }
    ]
  }
];
