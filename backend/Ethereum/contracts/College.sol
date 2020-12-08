pragma solidity ^0.4.26;

contract College {
    
    string public name;
    
    uint public studentCount = 0;
    
    mapping(uint => Student) public students;
    
    struct Student {
         uint id;
         string nameHash;
         string imageHash;
         string rollnoHash;
         string classHash;
    }
    
    event studentCreated (
         uint id,
         string nameHash,
         string imageHash,
         string rollnoHash,
         string classHash
    );
    
     function createStudent(string memory _nameHash, string memory _imageHash, string memory _rollnoHash, string memory _classHash) public {
         
        require(bytes(_nameHash).length > 0);
        
        require(bytes(_classHash).length > 0);
        
        require(bytes(_rollnoHash).length > 0);
        
        studentCount ++;
        
        students[studentCount] = Student(studentCount, _nameHash, _imageHash, _rollnoHash, _classHash);
        
        emit studentCreated(studentCount, _nameHash, _imageHash, _rollnoHash, _classHash);
     }
}