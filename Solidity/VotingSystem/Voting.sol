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
        uint256 firstVoteTimestamp;
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
        Proposals.push(Proposal("propal 1", 10, 2));
        Proposals.push(Proposal("propal 2", 3, 5));
        Proposals.push(Proposal("propal 3", 10, 1));
        Proposals.push(Proposal("propal 4", 7, 9));
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
        Proposals.push(Proposal(_description, 0, 0));
        emit ProposalRegistered(proposalId);
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
        Proposals[proposalId].firstVoteTimestamp = Proposals[proposalId]
            .firstVoteTimestamp == 0
            ? block.timestamp
            : 0;
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

    function getVotedProposalIdByAddress(address addressToCheck)
        public
        view
        isVoterWhitelisted
        returns (uint256 proposalId)
    {
        require(
            Whitelist[addressToCheck].hasVoted == true,
            "Voter has not yet voted!"
        );
        return Whitelist[addressToCheck].votedProposalId;
    }

    function countVote()
        public
        onlyOwner
        isWorkflowStatusValid(
            WorkflowStatus.VotingSessionEnded,
            "You can't count vote for the moment!"
        )
    {
        uint256 tempWinningProposalID;
        bool isWinner = false;
        for (uint8 i = 0; i < Proposals.length; i++) {
            if (Proposals[i].voteCount > 0) {
                isWinner = true;
                bool isOlderThanLast = Proposals[i].firstVoteTimestamp <
                    Proposals[tempWinningProposalID].firstVoteTimestamp
                    ? true
                    : false;
                bool isVoteCountEqual = Proposals[i].voteCount ==
                    Proposals[tempWinningProposalID].voteCount
                    ? true
                    : false;
                bool isBiggerVoteCount = Proposals[i].voteCount >
                    Proposals[tempWinningProposalID].voteCount
                    ? true
                    : false;
                tempWinningProposalID = isBiggerVoteCount ||
                    (isVoteCountEqual && isOlderThanLast)
                    ? i
                    : tempWinningProposalID;
            }
        }
        state = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );

        winningProposalId = isWinner == false ? 999 : tempWinningProposalID;
    }

    function getWinningProposal()
        public
        view
        isWorkflowStatusValid(
            WorkflowStatus.VotesTallied,
            "You can't get the winning proposal before vote counted !"
        )
        returns (string memory)
    {
        return
            winningProposalId == 999
                ? "No Winner!"
                : Proposals[winningProposalId].description;
    }
}
