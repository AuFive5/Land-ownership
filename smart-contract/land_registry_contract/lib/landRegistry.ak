// src/LandRegistry.ak

// Define the smart contract
contract LandRegistry {

    /// Mint (register) a new land NFT
    pub fn register_land(owner: Address, metadata: LandMetadata) -> Token {
        Token {
            owner: owner,
            metadata: metadata
        }
    }

    /// Transfer ownership of existing land NFT
    pub fn transfer_land(existing_token: Token, new_owner: Address) -> Token {
        Token {
            owner: new_owner,
            metadata: existing_token.metadata
        }
    }

}

// Define the Token type (NFT representing a land)
type Token = {
    owner: Address,
    metadata: LandMetadata
}

// Define metadata stored inside the Token
type LandMetadata = {
    location: String,    // City, District
    area: Int,           // Size in square meters
    land_id: String      // Unique Land ID (can be a hash)
}
