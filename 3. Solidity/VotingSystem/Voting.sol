pragma solidity >=0.8.13 <=0.8.17;

// SPDX-License-Identifier: MIT
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Voting is Ownable {
    address admin;
    uint256 public winningProposalId;
    mapping(address => Voter) Whitelist;
    Proposal[] Proposals;
    WorkflowStatus state;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    struct Proposal {
        string description;
        uint256 voteCount;
    }
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    event VoterRegistered(address voterAddress);

    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );
    event ProposalRegistered(uint256 proposalId);
    event Voted(address voter, uint256 proposalId);

    constructor() {
        admin = msg.sender;
    }

    modifier isWorkflowStatusValid(
        WorkflowStatus requiredState,
        string memory error
    ) {
        require(state == requiredState, error);
        _;
    }
    modifier isVoterRegistred(address voterAddress) {
        require(
            Whitelist[voterAddress].isRegistered == false,
            "Voter already registred"
        );
        _;
    }
    modifier isVoterWhitelisted() {
        require(
            Whitelist[msg.sender].isRegistered == true,
            "You need to be whitelisted!"
        );
        _;
    }
    modifier isAlreadyVoted() {
        require(
            Whitelist[msg.sender].hasVoted == false,
            "You have already voted!"
        );
        _;
    }
    modifier isProposalExist(uint256 proposalId) {
        require(
            proposalId >= 0 && proposalId < Proposals.length,
            "Proposal id you are voting for does not exist!"
        );
        _;
    }

    function addVoterToWhitelist(address voterAddress)
        public
        onlyOwner
        isVoterRegistred(voterAddress)
        isWorkflowStatusValid(
            WorkflowStatus.RegisteringVoters,
            "Not voter registration period!"
        )
    {
        Whitelist[voterAddress].isRegistered = true;
        emit VoterRegistered(voterAddress);
    }

    function startProposalsRegistration()
        public
        onlyOwner
        isWorkflowStatusValid(
            WorkflowStatus.RegisteringVoters,
            "You can't start proposal registration"
        )
    {
        state = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    function registerProposal(string memory _description)
        public
        isVoterWhitelisted
        isWorkflowStatusValid(
            WorkflowStatus.ProposalsRegistrationStarted,
            "You can't register proposal for the moment"
        )
    {
        uint256 proposalId = Proposals.length;
        Proposals.push(Proposal(_description, 0));
        emit ProposalRegistered(proposalId);
    }

    function getProposalById(uint256 proposalId)
        public
        view
        returns (string memory)
    {
        return Proposals[proposalId].description;
    }

    function closeProposalsRegistration()
        public
        onlyOwner
        isWorkflowStatusValid(
            WorkflowStatus.ProposalsRegistrationStarted,
            "You can't close proposals registration"
        )
    {
        state = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    function startVotingSession()
        public
        onlyOwner
        isWorkflowStatusValid(
            WorkflowStatus.ProposalsRegistrationEnded,
            "You can't start voting session"
        )
    {
        state = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    function vote(uint256 proposalId)
        public
        isWorkflowStatusValid(
            WorkflowStatus.VotingSessionStarted,
            "You can't vote for the moment!"
        )
        isVoterWhitelisted
        isAlreadyVoted
        isProposalExist(proposalId)
    {
        Whitelist[msg.sender].hasVoted = true;
        Whitelist[msg.sender].votedProposalId = proposalId;
        Proposals[proposalId].voteCount++;
        emit Voted(msg.sender, proposalId);
    }

    function closeVotingSession()
        public
        onlyOwner
        isWorkflowStatusValid(
            WorkflowStatus.VotingSessionStarted,
            "You can't close voting session"
        )
    {
        state = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }
}
// Axe d'améloioration
// Gerer les cas d'égalité entre deux votes
