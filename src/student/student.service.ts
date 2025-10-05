import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Student } from '@prisma/client';
import { firstLettlerWithoutRepert } from 'src/utils/first-letter-without-repert';
import { StudentEntity } from './entities/student.entities';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStudentDTO: CreateStudentDTO): Promise<Student> {
    if (createStudentDTO.grade > 10 || createStudentDTO.grade < 0) {
      throw new BadRequestException(
        'Nota deve ser positiva e menor ou igual a 10',
      );
    }

    return this.prismaService.student.create({
      data: {
        ...createStudentDTO,
      },
    });
  }

  async findAll(): Promise<StudentEntity[]> {
    const studentList = await this.prismaService.student.findMany({
      where: {},
    });

    const newStudentList = studentList.map((student) => {
      return {
        ...student,
        firstLettlerWithoutRepert: firstLettlerWithoutRepert(student.name),
      };
    });

    return newStudentList;
  }

  async findOneByID(idStudent: string): Promise<StudentEntity> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id: idStudent,
      },
    });

    if (!student) {
      throw new NotFoundException('ID de estudante não encontrado');
    }

    return {
      ...student,
      firstLettlerWithoutRepert: firstLettlerWithoutRepert(student.name),
    };
  }
}
