from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str


class TaskResponse(BaseModel):
    id: int
    title: str
    is_completed: bool

    class Config:
        from_attributes = True
