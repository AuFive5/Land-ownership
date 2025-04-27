use cardano/address.{Credential}
use cardano/assets.{PolicyId}
use cardano/certificate.{Certificate}
use cardano/governance.{ProposalProcedure, Voter}
use cardano/transaction.{Transaction, OutputReference}

type Redeemer {
  RegisterLand
  TransferOwnership { new_owner: Address }
}

type LandDatum {
  owner: Address
  land_id: ByteArray
  location: String
  size: String
}

validator placeholder {
  mint(_redeemer: Data, _policy_id: PolicyId, _self: Transaction) {
    todo @"mint logic goes here"
  }

  spend(_datum: Option<Data>, _redeemer: Data, _utxo: OutputReference, _self: Transaction) {
    todo @"spend logic goes here"
  }

  withdraw(_redeemer: Data, _account: Credential, _self: Transaction) {
    todo @"withdraw logic goes here"
  }

  publish(_redeemer: Data, _certificate: Certificate, _self: Transaction) {
    todo @"publish logic goes here"
  }

  vote(_redeemer: Data, _voter: Voter, _self: Transaction) {
    todo @"vote logic goes here"
  }

  propose(redeemer: Data, proposal: ProposalProcedure, tx: Transaction) {
  let
    action = unsafe_data_as<Redeemer>(redeemer)
    signers = tx.signatories
  in
    case action {
      RegisterLand ->
        (signers.length > 0)

      TransferOwnership { new_owner } -> 
        let
          datum = unsafe_data_as<LandDatum>(tx.inputs.head.datum)
        in
          (signers.any((s: Address) => s == datum.owner))
}
  }

  // // If needs be, remove any of unneeded handlers above, and use:
  //
  // else(_ctx: ScriptContext) {
  //   todo @"fallback logic if none of the other purposes match"
  // }
  //
  // // You will also need an additional import:
  // //
  // // use cardano/script_context.{ScriptContext}
}
