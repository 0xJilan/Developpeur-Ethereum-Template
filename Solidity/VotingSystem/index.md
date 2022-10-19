# ⚡️ Projet - Système de vote

Un smart contract de vote peut être simple ou complexe, selon les exigences des élections que vous souhaitez soutenir. Le vote peut porter sur un petit nombre de propositions (ou de candidats) présélectionnées, ou sur un nombre potentiellement important de propositions suggérées de manière dynamique par les électeurs eux-mêmes.

Dans ce cadres, vous allez écrire un smart contract de vote pour une petite organisation. Les électeurs, que l'organisation connaît tous, sont inscrits sur une liste blanche (whitelist) grâce à leur adresse Ethereum, peuvent soumettre de nouvelles propositions lors d'une session d'enregistrement des propositions, et peuvent voter sur les propositions lors de la session de vote.

## 👉 Les Objectifs :

- [x] Votre smart contract doit s’appeler “Voting”.
- [x] Votre smart contract doit utiliser la dernière version du compilateur.
- [x] Votre smart contract doit définir les structures de données Voter & Proposal
- [x] Votre smart contract doit définir une énumération qui gère les différents états d’un vote
- [x] Votre smart contract doit définir un uint winningProposalId qui représente l’id du gagnant ou une fonction getWinner qui retourne le gagnant.
- [x] Votre smart contract doit importer le smart contract la librairie “Ownable” d’OpenZepplin.
- [x] Votre smart contract doit définir 3 events VoterRegistered,WorkflowStatusChange , ProposalRegistered, Voted
- [x] L’administrateur est celui qui va déployer le smart contract.
- [x] Le vote n'est pas secret pour les utilisateurs ajoutés à la Whitelist
- [x] Chaque électeur peut voir les votes des autres
- [x] Le gagnant est déterminé à la majorité simple
- [x] La proposition qui obtient le plus de voix l'emporte.
- [x] L'administrateur du vote enregistre une liste blanche d'électeurs identifiés par leur adresse Ethereum.
- [x] L'administrateur du vote commence la session d'enregistrement de la proposition.
- [x] Les électeurs inscrits sont autorisés à enregistrer leurs propositions pendant que la session d'enregistrement est active.
- [x] L'administrateur de vote met fin à la session d'enregistrement des propositions.
- [x] L'administrateur du vote commence la session de vote.
- [x] Les électeurs inscrits votent pour leur proposition préférée.
- [x] L'administrateur du vote met fin à la session de vote.
- [x] L'administrateur du vote comptabilise les votes.
- [x] Tout le monde peut vérifier les derniers détails de la proposition gagnante.
