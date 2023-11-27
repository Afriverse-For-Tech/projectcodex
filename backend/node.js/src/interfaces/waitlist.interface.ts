interface WaitlistDocument {
    email: string;
    $id: string;
    $collectionId: string; 
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
  }

  export default WaitlistDocument