# VOTING CONTRACT

Voting is a smart contract for a small organization.
Voters are whitelisted using their Ethereum address and can submit new proposals in a proposal registration session. Then they can vote on the proposals during the voting session.

## Launch test

After clone this repository, you can launch the tests that ensure the security of the contract with the command :

```bash
$ truffle test
```

## List of tested features

    ✔ Admin only can add to Whitelist
    ✔ Event is emit once admin add voter to Whitelist
    ✔ Event WorkflowStatus is emit when admin  start Proposals Registering
    ✔ Should revert if admin try to register voter when registration not open
    ✔ Voters cant register  proposal if not register
    ✔ Voters cant register empty proposal
    ✔ Voters can register proposal during Proposals Registering
    ✔ Event WorkflowStatus is emit when admin end Proposals Registering
    ✔ Event WorkflowStatus is emit when admin start voting session
    ✔ Voters cant vote if Voting session not open
    ✔ Registred Voter can only vote one time
    ✔ Registred Voter can only vote for existing proposal
    ✔ Event WorkflowStatus is emit when admin close voting session
    ✔ Should correctly tally vote!
    ✔ Event WorkflowStatus is emit when votes are  tallied
